import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginTop: '8px',
  },
  rightBtn: {
    backgroundColor: theme.palette.secondary.main,
    marginLeft: '8px',
  },
});

const TradeRequestBtns = ({ classes, toggleTradeRequests, trades }) => {
  const { awaitingApproval, submitted } = trades;
  return (
    <div>
      <Button
        className={classes.button}
        onClick={toggleTradeRequests}
        variant="contained"
      >
        Submitted Trade Proposals ({submitted.length})
      </Button>
      <Button
        className={`${classes.button} ${classes.rightBtn}`}
        onClick={toggleTradeRequests}
        variant="contained"
      >
        Offers Awaiting Approval ({awaitingApproval.length})
      </Button>
    </div>
  );
};

TradeRequestBtns.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    rightBtn: PropTypes.string,
  }).isRequired,
  toggleTradeRequests: PropTypes.func.isRequired,
  trades: PropTypes.shape({
    awaitingApproval: PropTypes.arrayOf(PropTypes.object),
    submitted: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default withStyles(styles)(TradeRequestBtns);
