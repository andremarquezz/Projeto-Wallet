import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    submit: true,
    validateEmail: false,
  };

  handleChange = ({ target }) => {
    const { type, value } = target;
    this.setState(
      {
        [type]: value,
      },
      () => {
        this.validateEmail();
      },
    );
  };

  handleSubmit = (event) => {
    const { handleUser, history } = this.props;
    event.preventDefault();
    handleUser(this.state);
    history.push('/carteira');
  };

  validatePassword = () => {
    const minWord = 6;
    const { password, validateEmail } = this.state;
    if (validateEmail && password.length >= minWord) {
      this.setState({ submit: false });
    }
    if (validateEmail && password.length < minWord) {
      this.setState({ submit: true });
    }
  };

  validateEmail = () => {
    const { email } = this.state;
    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      this.setState(
        {
          validateEmail: true,
        },
        () => {
          this.validatePassword();
        },
      );
    } else {
      this.setState(
        {
          validateEmail: false,
        },
        () => {
          this.validatePassword();
        },
      );
    }
  };

  render() {
    const { submit } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            placeholder="Digite seu email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button type="submit" onClick={ this.handleSubmit } disabled={ submit }>
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleUser: (state) => dispatch(setUser(state)),
});

Login.propTypes = {
  handleUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
