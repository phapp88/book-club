import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  icon: {
    color: 'white',
    margin: '7.5px auto',
  },
  root: {
    backgroundColor: theme.palette.primary.light,
    padding: '55px',
    textAlign: 'center',
  },
  subheading: {
    color: 'white',
  },
  title: {
    color: 'white',
  },
});

const MainTitle = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="display3">Book Trading Club</Typography>
      <Typography className={classes.subheading} variant="subheading">
        Trade and borrow books from people all over the world.
      </Typography>
      <i className={`fas fa-book fa-5x ${classes.icon}`} />
    </div>
  );
};

MainTitle.propTypes = {
  classes: PropTypes.shape({
    icon: PropTypes.string,
    root: PropTypes.string,
    subheading: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(MainTitle);
