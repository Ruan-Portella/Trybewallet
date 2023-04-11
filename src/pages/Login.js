import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoginUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    validate: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.validateFields);
  };

  validateFields = () => {
    const { email, password } = this.state;
    const MAX_LENGTH = 6;
    const regex = /\S+@\S+\.\S+/;
    const validateEmail = regex.test(email);
    const validatePassowrd = password.length >= MAX_LENGTH;
    this.setState({
      validate: !(validateEmail && validatePassowrd),
    });
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(LoginUser(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, validate } = this.state;
    return (
      <section>
        <label>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ validate }
        >
          Entrar

        </button>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
