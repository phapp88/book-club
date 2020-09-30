import Button from '@material-ui/core/Button';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

const SignupForm = ({ classes }) => {
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailFieldChange = (event) => {
    setErrMsg('');
    setEmail(event.target.value);
  };

  const handleNameFieldChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordFieldChange = (event) => {
    setPassword(event.target.value);
  };

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
        onChange={handleNameFieldChange}
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
        onChange={handleEmailFieldChange}
        required
        value={email}
      />
      <TextField
        fullWidth
        id="password"
        label="Password"
        name="password"
        onChange={handlePasswordFieldChange}
        required
        type="password"
        value={password}
      />
      <Button className={classes.button} type="submit" variant="contained">
        Sign Up
      </Button>
      <Link href="/login">
        <Button
          className={`${classes.button} ${classes.linkBtn}`}
          variant="contained"
        >
          Login
        </Button>
      </Link>
    </form>
  );
};

SignupForm.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    form: PropTypes.string,
    heading: PropTypes.string,
    linkBtn: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(SignupForm);
