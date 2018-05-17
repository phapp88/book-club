import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  checkIcon: {
    color: 'green',
  },
  iconButton: {
    fontSize: '18px',
    opacity: '0.5',
    width: '36px',
    '&:hover': {
      opacity: '1',
    },
  },
  listItemText: {
    fontSize: '14px',
  },
  timesIcon: {
    color: 'red',
  },
  title: {
    color: theme.palette.text.primary,
    marginTop: '27.5px',
  },
});

const TradeRequests = ({
  classes, handleAcceptedOffer, handleRejectedOffer, title, trades,
}) => {
  const approvalNeeded = title.split(' ')[2] === 'Approval';
  return (
    <div>
      <Typography className={classes.title} variant="display1">{title}</Typography>
      <List dense disablePadding>
        {trades.map(trade => (
          <ListItem divider key={trade.book.id}>
            <ListItemIcon>
              <i className="fas fa-book" />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary={trade.book.title} />
            <ListItemSecondaryAction>
              {approvalNeeded &&
                <IconButton
                  className={`${classes.iconButton} ${classes.checkIcon}`}
                  onClick={() => handleAcceptedOffer(trade)}
                >
                  <i className="fas fa-check" />
                </IconButton>}
              <IconButton
                className={`${classes.iconButton} ${classes.timesIcon}`}
                onClick={() => handleRejectedOffer(trade)}
              >
                <i className="fas fa-times" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

TradeRequests.propTypes = {
  classes: PropTypes.shape({
    checkIcon: PropTypes.string,
    iconButton: PropTypes.string,
    listItemText: PropTypes.string,
    timesIcon: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  handleAcceptedOffer: PropTypes.func,
  handleRejectedOffer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  trades: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TradeRequests.defaultProps = {
  handleAcceptedOffer: () => {},
};

export default withStyles(styles)(TradeRequests);
