import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated} from '../component/auth'

//changing link color
//this two arguments, if matches it gives a color otherwise all the links will have a different color
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" }
}


//props
const Menu = ({ history }) => (

    <div>

        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, /*path*/ "/")} to="/">Home</Link>

            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, /*path*/ "/")} to="/users">Users</Link>

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
                    <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={(isActive(history, `/user/${isAuthenticated().user._id}`))}
                            className="nav-link"
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>

                </>
            )}

        </ul>

    </div>
);

export default withRouter(Menu);

