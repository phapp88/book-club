import Button from '@material-ui/core/Button';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginTop: '28px',
  },
  form: {
    backgroundColor: 'white',
    margin: '55px',
    padding: '55px',
  },
  heading: {
    color: theme.palette.text.primary,
  },
  linkBtn: {
    backgroundColor: theme.palette.secondary.main,
    marginLeft: '8px',
  },
});

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    const { email, errMsg, name, password } = this.props;
    this.state = {
      email,
      errMsg,
      name,
      password,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { id, value } = event.target;
    if (id === 'email') {
      this.setState({ errMsg: '', email: value });
    }
    this.setState({ [id]: value });
  }

  render() {
    const { classes } = this.props;
    const { email, errMsg, name, password } = this.state;
    return (
      <form
        action="/signup"
        autoComplete="off"
        className={classes.form}
        method="post"
      >
        <Typography className={classes.heading} variant="h4">
          Sign Up
        </Typography>
        <TextField
          fullWidth
          id="name"
          label="Name"
          name="name"
          onChange={this.handleChange}
          required
          value={name}
        />
        <TextField
          fullWidth
          id="email"
          error={errMsg !== ''}
          helperText={errMsg}
          label="Email"
          name="email"
          onChange={this.handleChange}
          required
          value={email}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          name="password"
          onChange={this.handleChange}
          required
          type="password"
          value={password}
        />
        <Button className={classes.button} type="submit" variant="contained">
          Sign Up
        </Button>
        <Link prefetch href="/login">
          <Button
            className={`${classes.button} ${classes.linkBtn}`}
            variant="contained"
          >
            Login
          </Button>
        </Link>
      </form>
    );
  }
}

SignupForm.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    form: PropTypes.string,
    heading: PropTypes.string,
    linkBtn: PropTypes.string,
  }).isRequired,
  email: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default withStyles(styles)(SignupForm);
