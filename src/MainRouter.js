import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './component/Home';
import Menu from './component/Menu';
import Signup from './component/user/Signup';
import Signin from './component/user/Signin';

const MainRouter = () => (

    <div>

        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />

        </Switch>
    </div>
);

export default MainRouter;