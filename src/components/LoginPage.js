import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  checkValidityLength,
  checkValidityEmail,
} from '../utils/validator.utils';
import { login } from '../store/actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: 500,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit,
  },
});

export class LoginPageComponent extends React.Component {
  state = {
    email: '',
    emailTouched: false,
    emailIsValid: false,
    password: '',
    passwordTouched: false,
    passwordIsValid: false,
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const touched = `${name}Touched`;
    const isValid = `${name}IsValid`;
    const checkValidity = () => {
      if (name === 'email') {
        return checkValidityEmail(value);
      }
      return checkValidityLength(name, value);
    };
    this.setState({
      [name]: value,
      [touched]: true,
      [isValid]: checkValidity(),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    onLogin(email, password);
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      emailTouched,
      emailIsValid,
      password,
      passwordTouched,
      passwordIsValid,
    } = this.state;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="login-email-input"
          label="Email"
          className={classes.textField}
          name="email"
          value={email}
          onChange={e => this.handleChange(e)}
          type="email"
          autoComplete="email"
          margin="normal"
          error={!emailIsValid && emailTouched}
        />
        <TextField
          id="login-password-input"
          label="Password"
          className={classes.textField}
          name="password"
          value={password}
          onChange={e => this.handleChange(e)}
          type="password"
          autoComplete="current-password"
          margin="normal"
          error={!passwordIsValid && passwordTouched}
        />
        <Button
          id="submit-button"
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!(emailIsValid && passwordIsValid)}
        >
          Login
        </Button>
      </form>
    );
  }
}

LoginPageComponent.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
  onLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onLogin: login,
};

const LoginPage = connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(LoginPageComponent));

export default LoginPage;
