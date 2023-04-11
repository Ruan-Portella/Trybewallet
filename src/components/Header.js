import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        <p data-testid="email-field">{email}</p>
        <span data-testid="total-field">
          {this.totalValue()}
        </span>
        <select data-testid="header-currency-field">
          <option>BRL</option>
        </select>
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
