import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    fontSize: '16px',
    opacity: '0.5',
    position: 'absolute',
    right: '0',
    top: '2px',
    '&:hover': {
      opacity: '1',
    },
  },
  root: {
    padding: '0 2.5px',
    position: 'relative',
  },
};

const AllBook = ({ book, classes, handleTradeOffer, userId }) => {
  const handleClick = () => {
    const { id: bookId, userId: offereeId } = book;
    const offerorId = userId;
    handleTradeOffer(book);
    fetch('/api/trades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ bookId, offereeId, offerorId }),
    });
  };

  const { imgSrc, title, userId: bookUserId } = book;

  return (
    <div className={classes.root}>
      <img alt={title} src={imgSrc} />
      {bookUserId !== userId && book.isAvailable && (
        <button className={classes.button} onClick={handleClick} type="button">
          <Icon className="fas fa-exchange-alt fa-1x" />
        </button>
      )}
    </div>
  );
};

AllBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    imgSrc: PropTypes.string,
    isAvailable: PropTypes.bool,
    title: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string,
    root: PropTypes.string,
  }).isRequired,
  handleTradeOffer: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(AllBook);
