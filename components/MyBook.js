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

const MyBook = ({ book, classes, removeBook }) => {
  const handleClick = () => {
    const { id } = book;
    removeBook(id);
    fetch(`/api/book/${id}`, { method: 'DELETE', credentials: 'include' });
  };

  const { imgSrc, title } = book;

  return (
    <div className={classes.root}>
      <img alt={title} src={imgSrc} crossOrigin="anonymous" />
      <button className={classes.button} onClick={handleClick} type="button">
        <Icon className="fas fa-times fa-1x" />
      </button>
    </div>
  );
};

MyBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    imgSrc: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string,
    root: PropTypes.string,
  }).isRequired,
  removeBook: PropTypes.func.isRequired,
};

export default withStyles(styles)(MyBook);
