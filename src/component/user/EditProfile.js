import React, {Component} from 'react';
import { isAuthenticated } from '../auth';
import { read } from '../user/apiUser';

class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: ""
        }
    }

    init = Id => {
        const token = isAuthenticated().token;
        read(Id, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.setState({ id: data._id, name: data.name, email: data.email})
            }
        });

    };

    //LIFECYCLEMETHODS
    componentDidMount() {
        const Id = this.props.match.params.Id;
        this.init(Id);

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    clickSubmit = event => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password,
            
        };
    
        //console.log(user);

        signup(user)
        .then(data => {
            if(data.error) this.setState({error: data.error});
            else this.setState({
                error: "",
                name: "",
                email: "",
                password: "",
                open: true
            });
        });
    };




    signupForm = (name, email) => (

        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input  onChange={this.handleChange("name")} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
            </div>

            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary"> Submit</button>
        </form>
    );
        

    render() {
        const { name, email} = this.state;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                {this.signupForm(name, email)}

            </div>
        );
    }
}

export default EditProfile;