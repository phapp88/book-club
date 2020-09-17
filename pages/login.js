import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

const Login = ({ email, errMsg, password, userId }) => (
  <Layout userId={userId}>
    <LoginForm email={email} errMsg={errMsg} password={password} />
  </Layout>
);

Login.getInitialProps = ({ query, req }) => {
  let userId = '';
  if (req && Object.prototype.hasOwnProperty.call(req.session, 'passport')) {
    ({ user: userId } = req.session.passport);
  } else if (Object.prototype.hasOwnProperty.call(query, 'userId')) {
    ({ userId } = query);
  }
  if (Object.keys(query).length > 1) {
    const { email, errMsg, password } = query;
    return {
      email,
      errMsg,
      password,
      userId,
    };
  }
  return {
    email: '',
    errMsg: '',
    password: '',
    userId,
  };
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Login;
