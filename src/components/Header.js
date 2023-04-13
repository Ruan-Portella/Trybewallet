import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderLogo from '../images/emoji.png';
import DespesaLogo from '../images/Vector.png';
import ProfileLogo from '../images/profile.png';
import '../styles/Header.css';

class Header extends Component {
  totalValue = () => {
    const { expenses } = this.props;
    let Sum = 0;
    expenses.forEach((despesa) => {
      Sum += Number(despesa.value) * Number(despesa.exchangeRates[despesa.currency].ask);
    });
    return Sum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <section className="Header-content">
          <h1>
            <img src={ HeaderLogo } alt="HeaderLogo" />
            TrybeWallet
          </h1>
          <p data-testid="header-currency-field">
            <img src={ DespesaLogo } alt="DespesaLogo" />
            {`Total de Despesas ${this.totalValue()} BRL`}
          </p>
          <span data-testid="email-field">
            <img src={ ProfileLogo } alt="ProfileLogo" />
            {email}
          </span>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
