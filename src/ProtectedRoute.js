import React from 'react';
import { Redirect } from 'react-router-dom';
import { h } from 'preact';

function ProtectedRoute(props) {
  const Component = props.component;
  const isUser = props.user;

  return isUser ? (
    <Component></Component>
  ) : (
    <Redirect to={{ pathname: this.props.fallBackLink }} />
  );
}

export default ProtectedRoute;