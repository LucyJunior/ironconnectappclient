import React, {Component} from "react";

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false  
    };
    }

    handleChange = (name) => (event) => {

        this.setState({error: " "})
        this.setState({ [name]: event.target.vaue });
    };
//onclick method hat gets the event
    clickSubmit = event => {
        //so the page doesnt load
        event.preventDefault()
        const {name, email, password} = this.state
        const user = {
            name,
            email,
            password,
            
        };
    
        //console.log(user);

        this.signup(user)
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

    signupForm = () => (

        
    )

    signup = (user) => {

        return fetch("http//localhost:8080/signup", {
            method: "POST",
             headers: {
                 Accept: "application/json",
                "Content-Type": "application/json"
             },
             body: JSON.stringify(user)
         })
         .then(response => {
             return response.json()
         })
         .catch(err => console.log(err));
    
    };

    render() {
        const {name, email, password, error, open} = this.state;

        return(
    <div className="container">
        <h2 className="mt-5 mb-5">SignUp</h2>

        <div className="alert alert-primary" style={{display: error ? "" : "none"}}>{error}</div>


        <div className="alert alert-info" style={{display: open ? "" : "none"}}>WELCOME BISH! Account is created. Please sign in</div>

        {this.signupForm()}
        
    </div>

        );


    }
};

export default Signup;