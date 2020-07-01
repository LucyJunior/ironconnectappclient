// import React, {Component} from 'react';
// import { isAuthenticated } from '../auth';
// import { create } from '../user/apiPost';
// import { Redirect } from 'react-router-dom';

// class newPost extends Component {
//     constructor() {
//         super()
//         this.state = {
//             title: '',
//             body: '',
//             photoL '',
//             user: {}

//         };
//     }

//     init = Id => {
//         const token = isAuthenticated().token;
//         read(Id, token).then(data => {
//             if (data.error) {
//                 this.setState({ redirectToProfile: true });
//             } else {
//                 this.setState({ id: data._id, name: data.name, email: data.email, error:'', about: data.about})
//             }
//         });

//     };

//     //LIFECYCLEMETHODS
//     componentDidMount() {
//         this.postData = new FormData();
//         this.setState({ user: isAuthenticated(.user)})

//     }

//     handleChange = name => event => {
//         this.setState({ [name]: event.target.value });
//     };
//     clickSubmit = event => {
//         event.preventDefault();
//         const {name, email, password} = this.state;
//         const user = {
//             name,
//             email,
//             password,
            
//         };
    
//         //console.log(user);
//         const Id = this.props.match.params.Id; 
//         const token = isAuthenticated().token;

//         update(Id, token, user)
//         .then(data => {
//             if(data.error) this.setState({error: data.error});
//             else this.setState({
//                 redirectToProfile: true
//         });

//     });
//     };




//     signupForm = (name, email, password) => (

//         <form>
//             <div className="form-group">
//                 <label className="text-muted">Name</label>
//                 <input  onChange={this.handleChange("name")} type="text" className="form-control" value={name} />
//             </div>
//             <div className="form-group">
//                 <label className="text-muted">Email</label>
//                 <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}/>
//             </div>
//             <div className="form-group">
//                 <label className="text-muted">Password</label>
//                 <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
//             </div>

//             <button onClick={this.clickSubmit} className="btn btn-raised btn-primary"> Update</button>
//         </form>
//     );
        

//     render() {
//         const { id, name, email, password, redirectToProfile} = this.state;
//         if(redirectToProfile) {
//            return  <Redirect to={`/user/${id} `} />;
//         }

//         return (
//             <div className="container">
//                 <h2 className="mt-5 mb-5">Edit Profile</h2>
//                 {this.signupForm(name, email, password)}

//             </div>
//         );
//     }
// }

// export default newPost;