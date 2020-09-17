import fetch from 'isomorphic-unfetch';
import FormHelperText from '@material-ui/core/FormHelperText';
import { ObjectID } from 'bson';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
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

class AddBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errMsg: '', searchTerm: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ errMsg: '', searchTerm: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { userId } = this.props;
    const { searchTerm } = this.state;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=1&projection=lite`;
    try {
      const result = await fetch(url);
      const json = await result.json();
      const { title, imageLinks } = json.items[0].volumeInfo;
      const imgLink = imageLinks.smallThumbnail;
      const id = String(new ObjectID());
      const book = { id, imgLink, title };
      this.props.addBook(book);
      this.setState({ searchTerm: '' });
      fetch(`/api/books/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(book),
      });
    } catch (err) {
      this.setState({ errMsg: 'Please try again.' });
    }
  }

  render() {
    const { classes } = this.props;
    const { errMsg, searchTerm } = this.state;
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
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
              onChange={this.handleChange}
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
  }
}

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
