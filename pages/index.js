import PropTypes from 'prop-types';
import React from 'react';

import Features from '../components/Features';
import Layout from '../components/Layout';
import MainTitle from '../components/MainTitle';

const Index = ({ userId }) => (
  <Layout userId={userId}>
    <MainTitle />
    <Features />
  </Layout>
);

Index.getInitialProps = ({ query, req }) => {
  if (req) {
    const { session } = req;
    const userId = Object.prototype.hasOwnProperty.call(session, 'passport')
      ? session.passport.user
      : '';
    return { userId };
  }
  const userId = Object.prototype.hasOwnProperty.call(query, 'userId')
    ? query.userId
    : '';
  return { userId };
};

Index.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Index;
