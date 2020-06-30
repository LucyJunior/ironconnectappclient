import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { remove } from '../user/apiUser';
import {signout} from '../auth'

class DeleteUser extends Component {
    state = {
        redirect: false
    };

    deleteAccount = () => {
        const token = isAuthenticated().token;
        const Id = this.props.Id;
        remove(Id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            }else{
                //sign out user
                signout(() => console.log("User is deleted"))
                //redirect
                this.setState({redirect: true})

            }
        })
    };

    //prompt
    deleteConfirmed = () => {
        //alert that comes with window by default
        let answer = window.confirm("You sure you wanna leve us Ironhacker?")
        if(answer) {
            this.deleteAccount()
        }

    }
    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">

                   Delete Profile
            </button>


            
        );
    }
}

export default DeleteUser;