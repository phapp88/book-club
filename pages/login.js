import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

const Login = ({ email, errMsg, password }) => (
  <Layout userId="">
    <LoginForm email={email} errMsg={errMsg} password={password} />
  </Layout>
);

Login.getInitialProps = ({ query }) => {
  const props = query;
  if (Object.keys(props).length === 0) {
    props.email = '';
    props.errMsg = '';
    props.password = '';
  }
  return props;
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
