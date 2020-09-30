import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';

const Signup = ({ email, errMsg, name, password }) => (
  <Layout userId="">
    <SignupForm email={email} errMsg={errMsg} name={name} password={password} />
  </Layout>
);

Signup.getInitialProps = ({ query }) => {
  const props = query;
  if (Object.keys(props).length === 0) {
    props.email = '';
    props.errMsg = '';
    props.name = '';
    props.password = '';
  }
  return props;
};

Signup.propTypes = {
  email: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Signup;
