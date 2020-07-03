import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from '../user/apiUser';
import { Redirect } from 'react-router-dom';
import DefaultProfile from '../../images/avatar2.png';

class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            loading: false,
            about: ""

        }
    }

    init = Id => {
        const token = isAuthenticated().token;
        read(Id, token).then(data => {
            console.log(data)
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({ id: data._id, name: data.name, email: data.email, error: '', about: data.about })
            }
        });

    };

    //LIFECYCLEMETHODS
    componentDidMount() {
        this.userData = new FormData()
        const Id = this.props.match.params.Id;
        this.init(Id);

    }

    handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        this.userData.set(name, value)
        this.setState({ [name]: value });
    };
    clickSubmit = event => {
        event.preventDefault({loading: true})
        this.setState()
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password: password || undefined

        };

        //console.log(user);
        const Id = this.props.match.params.Id;
        const token = isAuthenticated().token;

        update(Id, token, this.userData)
            .then(data => {
                console.log(data)
                if (data.error) this.setState({ error: data.error });
                else
                updateUser(data.user, () => {
                    this.setState({
                        redirectToProfile: true
                    });
                })       
            });
    };


c

    signupForm = (name, email, password, about) => (

        <form>

            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
        <label className="text-muted">Something about you?</label>
        <textarea
          onChange={this.handleChange("about")}
          type="text"
          className="form-control"
          value={about}
        />
      </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
            </div>

            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary"> Update</button>
        </form>
    );


    render() {
        const { id, name, email, password, redirectToProfile, loading, about } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${id} `} />;
        }

        const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/api/user/photo/${id}?${new Date().getTime()}`
      : DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>


                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...Wait a minute..</h2>
                    </div>
                ) : (
                    ""
                )}

<img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={i => (i.target.src = `${DefaultProfile}`)}
          alt={name}
        />

        {isAuthenticated().user.role === "admin" &&
          this.signupForm(name, email, password, about)}

        {isAuthenticated().user._id === id &&
          this.signupForm(name, email, password, about)}


                {this.signupForm(name, email, password, about)}

            </div>
        );
    }
}

export default EditProfile;