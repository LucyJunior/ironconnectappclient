import React, { Component } from 'react';
import { list }
    from './apiUser'

class Users extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        //method list that will lit all users
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    //key, react requires us to have an index to each element we are redering

    renderUsers = (users) => (
        <div className="row" >

            {users.map((user, i) => {

                return <div className="card col-md-4" style={{ width: "18rem" }} key={i}>
                    <img src="" className="card-img-top" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            })}
        </div>);


    render() {
        const { users } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>

                {this.renderUsers(users)}

            </div>
        );
    }
}

export default Users;