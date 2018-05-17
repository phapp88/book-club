import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';
import withRoot from '../src/withRoot';

const Signup = ({
  email, errMsg, name, password, userId,
}) => (
  <Layout userId={userId} >
    <SignupForm
      email={email}
      errMsg={errMsg}
      name={name}
      password={password}
    />
  </Layout>
);

Signup.getInitialProps = ({ query, req }) => {
  let userId = '';
  if (req && Object.prototype.hasOwnProperty.call(req.session, 'passport')) {
    ({ user: userId } = req.session.passport);
  } else if (Object.prototype.hasOwnProperty.call(query, 'userId')) {
    ({ userId } = query);
  }
  if (Object.keys(query).length > 1) {
    const {
      email, errMsg, name, password,
    } = query;
    return {
      email, errMsg, name, password, userId,
    };
  }
  return {
    email: '', errMsg: '', name: '', password: '', userId,
  };
};

Signup.propTypes = {
  email: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withRoot(Signup);
