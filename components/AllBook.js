import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';

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

const AllBook = ({
  book, classes, handleTradeOffer, userId,
}) => {
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

  const { imgLink, title, userId: bookUserId } = book;

  return (
    <div className={classes.root}>
      <img alt={title} src={imgLink} />
      { bookUserId !== userId && book.isAvailable &&
        <button className={classes.button} onClick={handleClick}>
          <i className="fas fa-exchange-alt" />
        </button>}
    </div>
  );
};

AllBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    imgLink: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string,
    root: PropTypes.string,
  }).isRequired,
  handleTradeOffer: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(AllBook);
