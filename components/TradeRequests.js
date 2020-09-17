import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
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
  classes,
  handleAcceptedOffer,
  handleRejectedOffer,
  title,
  trades,
}) => {
  const approvalNeeded = title.split(' ')[2] === 'Approval';
  return (
    <div>
      <Typography className={classes.title} variant="h4">
        {title}
      </Typography>
      <List dense disablePadding>
        {trades.map((trade) => (
          <ListItem divider key={trade.book.id}>
            <ListItemIcon>
              <Icon className="fas fa-book fa-1x" />
            </ListItemIcon>
            <ListItemText
              className={classes.listItemText}
              primary={trade.book.title}
            />
            <ListItemSecondaryAction>
              {approvalNeeded && (
                <IconButton
                  className={`${classes.iconButton} ${classes.checkIcon}`}
                  onClick={() => handleAcceptedOffer(trade)}
                >
                  <Icon className="fas fa-check fa-1x" />
                </IconButton>
              )}
              <IconButton
                className={`${classes.iconButton} ${classes.timesIcon}`}
                onClick={() => handleRejectedOffer(trade)}
              >
                <Icon className="fas fa-times fa-1x" />
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
