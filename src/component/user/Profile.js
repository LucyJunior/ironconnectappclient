import React, {Component} from "react";
import {isAuthenticated} from '../auth';

class Profile extends Component {
         
    constructor() {
        super()
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    componentDidMount() {


            //get request to the backend to get info about the user
            const Id = this.props.match.params.Id;
            fetch(`${process.env.REACT_APP_API_URL}/user/${Id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuthenticated().token}`
                }
            })
            //response of the fetch
            .then(res => {
                return res.json()

            })

            .then(data => {
                if(data.error) {
                    console.log("error")
                } else{
                    this.setState({ user: data })
                }
            });
    };


    render () {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <p>Hello {isAuthenticated().user.name}</p>
                <p>Email {isAuthenticated().user.email}</p>
            </div>
        );

    }
    };

    export default Profile;
    