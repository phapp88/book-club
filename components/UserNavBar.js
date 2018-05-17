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
  iconButton: {
    minWidth: '16px',
  },
};

const UserNavBar = ({ classes, userId }) => (
  <AppBar>
    <Toolbar>
      <Typography className={classes.flex} variant="title">Book Trading Club</Typography>
      <Link prefetch href={`/?userId=${userId}`} as="/">
        <Button className={classes.button}>Home</Button>
      </Link>
      <Link prefetch href={`/allbooks?userId=${userId}`} as="/allbooks">
        <Button className={classes.button}>All Books</Button>
      </Link>
      <Link prefetch href={`/mybooks?userId=${userId}`} as="/mybooks">
        <Button className={classes.button}>My Books</Button>
      </Link>
      <Link prefetch href={`/settings?userId=${userId}`} as="/settings">
        <Button className={`${classes.button} ${classes.iconButton}`}>
          <i className="fas fa-cog" />
        </Button>
      </Link>
      <Link prefetch href="/logout">
        <Button className={`${classes.button} ${classes.iconButton}`}>
          <i className="fas fa-sign-out-alt" />
        </Button>
      </Link>
    </Toolbar>
  </AppBar>
);

UserNavBar.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    flex: PropTypes.string,
    iconButton: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(UserNavBar);
