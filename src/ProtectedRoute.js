import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
  render() {
    const Component = this.props.component;
    const isAuth = this.props.isAuth;
    return isAuth ? (
      <Component></Component>
    ) : (
      <Redirect to={{ pathname: this.props.fallBackLink }} />
    );
  }
}

export default ProtectedRoute;