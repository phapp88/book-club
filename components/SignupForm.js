import Button from '@material-ui/core/Button';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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

const SignupForm = ({
  classes,
  email: inUseEmail,
  errMsg,
  name: initialName,
  password: initialPassword,
}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(inUseEmail);
    setMessage(errMsg);
    setName(initialName);
    setPassword(initialPassword);
  }, [inUseEmail, errMsg, initialName, initialPassword]);

  const handleEmailFieldChange = (event) => {
    setMessage('');
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
        type="text"
        value={name}
      />
      <TextField
        fullWidth
        id="email"
        error={message !== ''}
        helperText={message}
        label="Email"
        name="email"
        onChange={handleEmailFieldChange}
        required
        type="email"
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
  email: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default withStyles(styles)(SignupForm);
