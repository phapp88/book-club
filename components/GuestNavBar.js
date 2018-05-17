import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  button: {
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  flex: {
    color: 'white',
    flex: 1,
  },
};

const GuestNavBar = ({ classes }) => (
  <AppBar>
    <Toolbar>
      <Typography className={classes.flex} variant="title">Book Trading Club</Typography>
      <Link prefetch href="/">
        <Button className={classes.button}>Home</Button>
      </Link>
      <Link prefetch href="/signup">
        <Button className={classes.button}>Sign Up</Button>
      </Link>
      <Link prefetch href="/login">
        <Button className={classes.button}>Login</Button>
      </Link>
    </Toolbar>
  </AppBar>
);


GuestNavBar.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    flex: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(GuestNavBar);
