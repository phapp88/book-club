import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
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
  helperText: {
    fontSize: '14px',
    marginBottom: '-22px',
  },
});

const ChangePasswordForm = ({
  changePassword,
  classes,
  currentPassword,
  errMsg,
  handleChange,
  msg,
  newPassword,
}) => (
  <form autoComplete="off" className={classes.form} onSubmit={changePassword}>
    <Typography className={classes.heading} variant="h4">
      Change Password
    </Typography>
    <TextField
      error={errMsg !== ''}
      fullWidth
      helperText={errMsg}
      id="currentPassword"
      label="Current Password"
      name="currentPassword"
      onChange={handleChange}
      required
      type="password"
      value={currentPassword}
    />
    <TextField
      fullWidth
      id="newPassword"
      label="New Password"
      name="newPassword"
      onChange={handleChange}
      required
      type="password"
      value={newPassword}
    />
    {msg !== '' && (
      <FormHelperText className={classes.helperText}>{msg}</FormHelperText>
    )}
    <Button className={classes.button} type="submit" variant="contained">
      Save Changes
    </Button>
  </form>
);

ChangePasswordForm.propTypes = {
  changePassword: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string,
    form: PropTypes.string,
    heading: PropTypes.string,
    helperText: PropTypes.string,
  }).isRequired,
  currentPassword: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChangePasswordForm);
