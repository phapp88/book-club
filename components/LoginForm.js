import Button from 'material-ui/Button';
import { FormHelperText } from 'material-ui/Form';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    const { email, errMsg, password } = this.props;
    this.state = { email, errMsg, password };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { id, value } = event.target;
    this.setState({ errMsg: '', [id]: value });
  }

  render() {
    const { classes } = this.props;
    const { email, errMsg, password } = this.state;
    return (
      <form action="/login" autoComplete="off" className={classes.form} method="post">
        <Typography className={classes.heading} variant="display1">Login</Typography>
        <TextField
          fullWidth
          id="email"
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
        <FormHelperText error>{errMsg}</FormHelperText>
        <Button className={classes.button} type="submit">Login</Button>
        <Link prefetch href="/signup">
          <Button className={`${classes.button} ${classes.linkBtn}`}>Register</Button>
        </Link>
      </form>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    form: PropTypes.string,
    heading: PropTypes.string,
    linkBtn: PropTypes.string,
  }).isRequired,
  email: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default withStyles(styles)(LoginForm);
