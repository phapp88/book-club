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

const ProfileForm = ({
  city,
  classes,
  errMsg,
  handleChange,
  msg,
  name,
  state,
  updateProfile,
}) => (
  <form autoComplete="off" className={classes.form} onSubmit={updateProfile}>
    <Typography className={classes.heading} variant="h4">
      Update Profile
    </Typography>
    <TextField
      fullWidth
      id="name"
      label="Name"
      name="name"
      onChange={handleChange}
      required
      value={name}
    />
    <TextField
      fullWidth
      id="city"
      label="City"
      name="city"
      onChange={handleChange}
      value={city}
    />
    <TextField
      fullWidth
      id="state"
      label="State"
      name="state"
      onChange={handleChange}
      value={state}
    />
    {msg !== '' && (
      <FormHelperText className={classes.helperText}>{msg}</FormHelperText>
    )}
    {errMsg !== '' && (
      <FormHelperText className={classes.helperText} error>
        {errMsg}
      </FormHelperText>
    )}
    <Button className={classes.button} type="submit" variant="contained">
      Save Changes
    </Button>
  </form>
);

ProfileForm.propTypes = {
  city: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string,
    form: PropTypes.string,
    heading: PropTypes.string,
    helperText: PropTypes.string,
  }).isRequired,
  errMsg: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProfileForm);
