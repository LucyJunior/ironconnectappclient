import React, {Component} from 'react';
import { isAuthenticated } from '../auth';

class EditProfile extends Component {

    init = Id => {
        const token = isAuthenticated().token;
        read(Id, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.setState({ user: data })
            }
        });

    };

    //LIFECYCLEMETHODS
    componentDidMount() {
        const Id = this.props.match.params.Id;
        this.init(Id);

    };
    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

            </div>
        );
    }
}

export default EditProfile;