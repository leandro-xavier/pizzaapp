import React,{useContext} from 'react';
import { AuthContext } from '../auth/AuthContext'
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import { LoginScreen } from '../components/screens/LoginScreen';
import { AllCommerce } from '../components/screens/AllCommerce';
import {PrivateRoute} from './PrivateRoute';
import {PublicRoute} from './PublicRoute';
import { DetailsCommerce } from '../components/screens/DetailsCommerce';
import { Dashboard } from '../components/screens/Dashboard';


export const AppRouter = () => {
  const {user} = useContext(AuthContext);
  return (
    <Router>
    <div>
    <Switch>
        <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated={user.logged}/>

        <PrivateRoute exact path="/" component={AllCommerce} isAuthenticated={user.logged}/>
        <PrivateRoute path="/tienda/:names" component={DetailsCommerce} isAuthenticated={user.logged}/>
        <PrivateRoute path="/user/dashboard" component={Dashboard} isAuthenticated={user.logged}/>
        <Redirect to="/login"/>
    </Switch>
    </div>
</Router>
  )
}
