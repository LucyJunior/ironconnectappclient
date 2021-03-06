import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated} from '../component/auth'
import './Menu.css';

//changing link color
//this two arguments, if matches it gives a color otherwise all the links will have a different color
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#3385ff" };
    else return { color: " #ffff" }
}


//props
const Menu = ({ history }) => (

    <div className="container-fluid">
    <div className=" navbar-center ">

        <ul className="nav nav-tabs">
            <li className="nav-item ">
                <Link className="nav-link" style={isActive(history, /*path*/ "/")} to="/">Home</Link>

            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/users")} to="/users">Users</Link>

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

                    <Link className="nav-link" style={isActive(history, "/post/create")} to="/post/create">Create Post</Link>

                    <li className="nav-item">
                    <Link
                            to={`/api/user/${isAuthenticated().user._id}`}
                            style={(isActive(history, `/api/user/${isAuthenticated().user._id}`))}
                            className="nav-link"
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <span className="nav-link" style={(isActive(history, /*path*/ "/signout"), { cursor: "pointer", color: "#fff" })
                        }
                            onClick={() => signout(() => history.push('/'))}>Sign Out</span>
                    </li>

                </>
            )}

        </ul>

    </div>
    </div>
    
);

export default withRouter(Menu);

