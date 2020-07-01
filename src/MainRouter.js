import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './component/Home';
import Menu from './component/Menu';
import Signup from './component/user/Signup';
import Signin from './component/user/Signin';
import Profile from './component/user/Profile';
import Users from './component/user/Users';
import EditProfile from './component/user/EditProfile';

const MainRouter = () => (

    <div>

        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/user/edit/:Id" component={EditProfile} />
            <Route exact path="/api/user/:Id" component={Profile} />
        </Switch>
    </div>
);

export default MainRouter;