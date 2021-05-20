import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const isAuthentificated = (localStorage.getItem("isAuthentificated") === "true");
    return (
        <Route {...rest} component={(props)=>
            isAuthentificated ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/" />
            )
        } />
    )
}

export default PrivateRoute;