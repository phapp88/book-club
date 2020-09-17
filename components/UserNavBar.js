import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
      <Typography className={classes.flex} variant="h6">
        Book Trading Club
      </Typography>
      <Link href={`/?userId=${userId}`} as="/">
        <Button className={classes.button}>Home</Button>
      </Link>
      <Link href={`/allbooks?userId=${userId}`} as="/allbooks">
        <Button className={classes.button}>All Books</Button>
      </Link>
      <Link href={`/mybooks?userId=${userId}`} as="/mybooks">
        <Button className={classes.button}>My Books</Button>
      </Link>
      <Link href={`/settings?userId=${userId}`} as="/settings">
        <Button className={`${classes.button} ${classes.iconButton}`}>
          <Icon className="fas fa-cog fa-1x" />
        </Button>
      </Link>
      <Link href="/logout">
        <Button className={`${classes.button} ${classes.iconButton}`}>
          <Icon className="fas fa-sign-out-alt fa-1x" />
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
