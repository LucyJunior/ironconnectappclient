import React, { Component } from "react";
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from '../user/apiUser';
import DefaultProfile from '../../images/avatar2.png';
import DeleteUser from '../user/DeleteUser';
import FollowProfileButton from './FollowProfileButton';


class Profile extends Component {

    constructor() {
        super()
        this.state = {
            user: {following: [], followers: []},
            redirectToSignin: false,
            following: false,
            error: ''
        };
    }

     //check if we are following an user or not
     checkFollow = user => {
        const jwt = isAuthenticated();
        console.log(user.followers)
        const match = user.followers.find(follower => {
            //one id has many other followers and the other way around
            //if is found is already in the following list
            console.log(follower)
            return follower._Id == jwt.user._id
        })
        return match
    };

    //req to the backed

    clickFollowButton = apiCall => {
        const Id = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        apiCall(Id, token, this.state.user._id)
        .then(data => {
            if(data.error) {
                this.setState({error: data.error})
            } else {
                this.setState({user: data, following: !this.state.following})
            }
        });

    };



    //refactoring
    //user id as an argument
    init = Id => {
        const token = isAuthenticated().token;
        read(Id, token).then(data => {
            if (data.error) {
                //if theres any error if user is not autheticated so we re direct them to sign in page otherwise
                //show the info
                this.setState({ redirectToSignin: true });
            } else {
                let following = this.checkFollow(data)
                this.setState({ user: data, following: following });
            }
        });

    };


    //LIFECYCLEMETHODS

    //grab the id from the parameter and give the user id to init method so it process whatever it needs to be done 
    componentDidMount() {
        //get request to the backend to get info about the user
        const Id = this.props.match.params.Id;
        this.init(Id);

    };

    //Each Id will receive its own info buttons
    componentWillReceiveProps(props) {
        const Id = props.match.params.Id;
        this.init(Id);

    };

    render() {
        const { redirectToSignin, user } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />


        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">

                    <div className="col-md-6">
                   <img src="" className="card-img-top" src={DefaultProfile} alt="Card image cap" alt={user.name} style={{ width: '100%', height: '15vw', objectFit: 'cover' }} />

                    </div>

                    <div className="col-md-6">

                        <div className="lead mt-2">
                            <p>Hello {user.name}</p>
                            <p>Email {user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                        </div>

                        {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                            <div className="d-inline-block" >
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}> Edit Profile</Link>
                                <DeleteUser Id={user._id} />
                            </div>
                        ) : (
                            <FollowProfileButton  following={this.state.following} onButtonClick={this.clickFollowButton} />
                        )}

                    </div>
                </div>
            </div>
        );
    }
};

export default Profile;

//if authenticated user and his id matches the profile then he can edit

//props user id line 82