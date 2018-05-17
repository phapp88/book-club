import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import React from 'react';

import ChangePasswordForm from '../components/ChangePasswordForm';
import Layout from '../components/Layout';
import ProfileForm from '../components/ProfileForm';
import withRoot from '../src/withRoot';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    const {
      city, currentPassword, name, newPassword, state,
    } = this.props;
    this.state = {
      city,
      currentPassword,
      name,
      newPassword,
      state,
      passwordErrMsg: '',
      passwordMsg: '',
      profileErrMsg: '',
      profileMsg: '',
    };
    this.changePassword = this.changePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  async changePassword(event) {
    event.preventDefault();
    try {
      const res = await fetch(`/api/password/${this.props.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...this.state }),
      });
      const json = await res.json();
      if (Object.prototype.hasOwnProperty.call(json, 'msg')) {
        this.setState({ passwordMsg: json.msg });
      } else {
        this.setState({ passwordErrMsg: json.errMsg });
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(event) {
    const { id, value } = event.target;
    if (id === 'city' || id === 'name' || id === 'state') {
      this.setState({
        [id]: value,
        profileErrMsg: '',
        profileMsg: '',
      });
    } else if (id === 'currentPassword') {
      this.setState({
        [id]: value,
        passwordErrMsg: '',
        passwordMsg: '',
      });
    } else {
      this.setState({ [id]: value, passwordMsg: '' });
    }
  }

  async updateProfile(event) {
    event.preventDefault();
    try {
      const res = await fetch(`/api/profile/${this.props.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...this.state }),
      });
      const json = await res.json();
      if (Object.prototype.hasOwnProperty.call(json, 'nModified')) {
        if (json.nModified > 0) {
          this.setState({ profileMsg: 'Changes saved.' });
        }
      } else {
        this.setState({ profileErrMsg: 'Save failed. Please try again.' });
      }
    } catch (err) {
      console.log(err);
      this.setState({ profileErrMsg: 'Save failed. Please try again.' });
    }
  }

  render() {
    const { userId } = this.props;
    const {
      city,
      currentPassword,
      name,
      newPassword,
      passwordErrMsg,
      passwordMsg,
      profileErrMsg,
      profileMsg,
      state,
    } = this.state;
    return (
      <Layout userId={userId}>
        <ProfileForm
          city={city}
          errMsg={profileErrMsg}
          handleChange={this.handleChange}
          updateProfile={this.updateProfile}
          msg={profileMsg}
          name={name}
          state={state}
        />
        <ChangePasswordForm
          currentPassword={currentPassword}
          changePassword={this.changePassword}
          errMsg={passwordErrMsg}
          handleChange={this.handleChange}
          msg={passwordMsg}
          newPassword={newPassword}
        />
      </Layout>
    );
  }
}

Settings.getInitialProps = async ({ query, req }) => {
  if (req) {
    return { ...query };
  }
  const res = await fetch('/api/settings', { credentials: 'include' });
  const json = await res.json();
  return { ...json };
};

Settings.propTypes = {
  city: PropTypes.string.isRequired,
  currentPassword: PropTypes.string,
  name: PropTypes.string.isRequired,
  newPassword: PropTypes.string,
  state: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

Settings.defaultProps = {
  currentPassword: '',
  newPassword: '',
};

export default withRoot(Settings);
