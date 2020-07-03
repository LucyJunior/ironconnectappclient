import React, { Component } from 'react';
import { list } from './apiUser';
import DefaultProfile from '../../images/avatar2.png';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        //method list that will list all users

        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    //key, react requires us to have an index to each element we are redering

    renderUsers = users => (
        <div className="row mb-5" >

            {users.map((user, i) => {

                return <div className="card-body card-cascade wider col-md-3 mb-5 mt-2 ml-5" key={i}>
                    <div className="card-body view view-cascade overlay">
                        <img
                            style={{ height: "200px", width: "100%" }}
                            className="card-img-top  mb-3 img-thumbnail"
                            src={`${
                                process.env.REACT_APP_API_URL
                                }/api/user/photo/${user._id}`}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name}
                        />
                        <div className="card-img-top  mb-3">
                            <h5 className="card-title mb-2 text-white"><strong>{user.name}</strong></h5>
                            <p className="card-text mb-2 text-white">{user.email}</p>
                            <Link to={`/api/user/${user._id}`} className="btn btn-raised btn-info btn-sm rounded">View Profile</Link>
                        </div>
                    </div>
                    </div>
            })}
        </div>);


    render() {
        const { users} = this.state
        return (
            <div className="container ">
                <h2 className="mt-5 mb-5 text-white text-center mt-5 mb-5 bg-info">Users</h2>

                {this.renderUsers(users)}

            </div>
        );
    }
}

export default Users;