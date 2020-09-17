import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import GuestNavBar from './GuestNavBar';
import UserNavBar from './UserNavBar';

const styles = {
  filler: {
    height: '64px',
  },
};

const Layout = ({ children, classes, userId }) => {
  const NavBar =
    userId === '' ? <GuestNavBar /> : <UserNavBar userId={userId} />;
  return (
    <div>
      {NavBar}
      <div className={classes.filler} />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    filler: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(Layout);
