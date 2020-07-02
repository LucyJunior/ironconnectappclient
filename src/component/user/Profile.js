import React, { Component } from "react";
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from '../user/apiUser';
import DefaultProfile from '../../images/avatar2.png';
import DeleteUser from '../user/DeleteUser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';
import { listByUser } from "../post/apiPost";


class Profile extends Component {

    constructor() {
        super()
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: '',
            posts: []
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
            return follower._id == jwt.user._id
        })
        return match
    };

    //req to the backed

    clickFollowButton = apiCall => {
        const Id = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        apiCall(Id, token, this.state.user._id)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error })
                } else {
                    this.setState({ user: data, following: !this.state.following })
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
                this.loadPosts(data._id);
            }
        });

    };

    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
          console.log(data)
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
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
        const { redirectToSignin, user, posts } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />

        const photoUrl = user._id
            ? `${
            process.env.REACT_APP_API_URL
            }/api/user/photo/${user._id}?${new Date().getTime()}`
            : DefaultProfile;


            return (
                <div className="container">
                  <h2 className="mt-5 mb-5">Profile</h2>
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        style={{ height: "200px", width: "auto" }}
                        className="img-thumbnail"
                        src={photoUrl}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                      />
                    </div>
          
                    <div className="col-md-8">
                      <div className="lead mt-2">
                        <p>Hello {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                      </div>
          
                      {isAuthenticated().user &&
                      isAuthenticated().user._id === user._id ? (
                        <div className="d-inline-block">
                          <Link
                            className="btn btn-raised btn-info mr-5"
                            to={`/post/create`}
                          >
                            Create Post
                          </Link>
          
                          <Link
                            className="btn btn-raised btn-success mr-5"
                            to={`/user/edit/${user._id}`}
                          >
                            Edit Profile
                          </Link>
                          <DeleteUser userId={user._id} />
                        </div>
                      ) : (
                        <FollowProfileButton
                          following={this.state.following}
                          onButtonClick={this.clickFollowButton}
                        />
                      )}
          
                      <div>
                        {isAuthenticated().user &&
                          isAuthenticated().user.role === "admin" && (
                            <div class="card mt-5">
                              <div className="card-body">
                                <h5 className="card-title">Admin</h5>
                                <p className="mb-2 text-danger">
                                  Edit/Delete as an Admin
                                </p>
                                <Link
                                  className="btn btn-raised btn-success mr-5"
                                  to={`/user/edit/${user._id}`}
                                >
                                  Edit Profile
                                </Link>
                                {/*<DeleteUser userId={user._id} />*/}
                                <DeleteUser />
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                      <hr />
                      <p className="lead">{user.about}</p>
                      <hr />
          
                      <ProfileTabs
                        followers={user.followers}
                        following={user.following}
                        posts={posts}
                      />
                    </div>
                  </div>
                </div>
              );
            }
          }
          
          export default Profile;

//if authenticated user and his id matches the profile then he can edit

//props user id line 82