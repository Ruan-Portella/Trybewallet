import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoginUser } from '../redux/actions';
import ImageLogo from '../images/undraw_printing_invoices_-5-r4r.svg';
import HeadingLogin from '../images/emoji.png';
import '../styles/Login.css';

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
      <section className="main-login">
        <section className="left-login">
          <section className="left-login-Header">
            <h1>
              <img src={ HeadingLogin } alt="Heading Login" />
              TrybeWallet
            </h1>
          </section>
          <img src={ ImageLogo } alt="ImageLogo" className="left-login-image" />
        </section>
        <section className="right-login">
          <section className="card-login">
            <h2>LOGIN</h2>
            <section className="textField">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                data-testid="email-input"
                onChange={ this.handleChange }
                value={ email }
              />
            </section>
            <section className="textField">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Senha"
                data-testid="password-input"
                onChange={ this.handleChange }
                value={ password }
              />
            </section>
            <button
              className="btn-login"
              type="button"
              onClick={ this.handleClick }
              disabled={ validate }
            >
              Entrar

            </button>
            {
              validate && (
                <p className="Error">
                  <span className="asteristico">*</span>
                  Email e/ou senha inválidos
                </p>)
            }
          </section>
        </section>
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
