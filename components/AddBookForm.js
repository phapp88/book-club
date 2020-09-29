import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  helperText: {
    display: 'inline-block',
    fontSize: '14px',
    lineHeight: '14px',
    marginLeft: '12px',
  },
  iconButton: {
    color: 'rgba(0, 0, 0, 0.38)',
    fontSize: '16px',
  },
  paper: {
    display: 'inline-block',
    width: '262px',
  },
  toolbar: {
    padding: '16px',
  },
};

const AddBookForm = ({ addBook, classes, userId }) => {
  const [errMsg, setErrMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (event) => {
    setErrMsg('');
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`/api/books/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ searchTerm }),
      });
      const book = await res.json();
      addBook(book);
      setSearchTerm('');
    } catch (err) {
      setErrMsg('Please try again.');
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar}>
          <Input
            disableUnderline
            endAdornment={
              <InputAdornment position="end">
                <IconButton className={classes.iconButton} type="submit">
                  <Icon className="fas fa-plus fa-1x" />
                </IconButton>
              </InputAdornment>
            }
            name="searchTerm"
            onChange={handleSearchTermChange}
            placeholder="Add Book"
            value={searchTerm}
          />
        </Toolbar>
      </Paper>
      <FormHelperText className={classes.helperText} error>
        {errMsg}
      </FormHelperText>
    </form>
  );
};

AddBookForm.propTypes = {
  addBook: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    helperText: PropTypes.string,
    iconButton: PropTypes.string,
    paper: PropTypes.string,
    toolbar: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddBookForm);
