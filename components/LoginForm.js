import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    marginTop: '8px',
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

const LoginForm = ({ classes }) => {
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailFieldChange = (event) => {
    setErrMsg('');
    setEmail(event.target.value);
  };

  const handlePasswordFieldChange = (event) => {
    setErrMsg('');
    setPassword(event.target.value);
  };

  return (
    <form
      action="/login"
      autoComplete="off"
      className={classes.form}
      method="post"
    >
      <Typography className={classes.heading} variant="h4">
        Login
      </Typography>
      <TextField
        fullWidth
        id="email"
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
      <FormHelperText error>{errMsg}</FormHelperText>
      <Button className={classes.button} type="submit" variant="contained">
        Login
      </Button>
      <Link href="/signup">
        <Button
          className={`${classes.button} ${classes.linkBtn}`}
          variant="contained"
        >
          Register
        </Button>
      </Link>
    </form>
  );
};

LoginForm.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    form: PropTypes.string,
    heading: PropTypes.string,
    linkBtn: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(LoginForm);
