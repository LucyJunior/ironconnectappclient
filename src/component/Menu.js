import React from 'react'
import { Link, withRouter } from 'react-router-dom'

//changing link color
//this two arguments, if matches it gives a color otherwise all the links will have a different color
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" }
}

export const signout = (next) => {
    //will remove in the client side the jwt
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    //once we remove it, redirect the user
    return fetch("http://localhost:8080/api/signout", {
        method: "GET"
    })
        .then(response => {
            console.log('signout', response)
            return response.json();
        })

        .catch(err => console.log(err))

};

//take if the user 

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
};

//props
const Menu = ({ history }) => (

    <div>

        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, /*path*/ "/")} to="/">Home</Link>

            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, /*path*/ "/signin")} to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, /*path*/ "/signup")} to="/signup">Sign Up</Link>
                    </li>
                </>

            )}

            {isAuthenticated() && (
                <>

                    <li className="nav-item">
                        <a className="nav-link" style={(isActive(history, /*path*/ "/signout"), { cursor: "pointer", color: "#fff" })
                        }
                            onClick={() => signout(() => history.push('/'))}>Sign Out</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link">{isAuthenticated().user.name}</a>
                    </li>

                </>
            )}

        </ul>

    </div>
);

export default withRouter(Menu);

