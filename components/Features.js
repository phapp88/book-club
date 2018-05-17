import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  heading: {
    color: theme.palette.text.primary,
  },
  root: {
    backgroundColor: 'white',
    margin: '55px',
    padding: '10px',
    textAlign: 'center',
  },
});

const Features = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant="display1">Features</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Catalogue your books online" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="See all of the books our users own" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Request to borrow other users' books" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Easily manage books and requests from your dashboard" />
        </ListItem>

      </List>
    </div>
  );
};

Features.propTypes = {
  classes: PropTypes.shape({
    heading: PropTypes.string,
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Features);
