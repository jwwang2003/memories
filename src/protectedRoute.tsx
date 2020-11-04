import * as React from "preact/compat";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({component, user, fallback, ...rest}: any) => {
    const routeComponent = (props: any) => (
        user
            ? React.createElement(component, props)
            : <Redirect to={{pathname: fallback}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};
