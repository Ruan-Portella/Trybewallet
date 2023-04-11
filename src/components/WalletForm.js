import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ExpenseSaved } from '../redux/actions';

class WalletForm extends Component {
  state = {
    InputValue: 0,
    InputDescription: '',
    InputCurrency: 'USD',
    InputMethod: 'Dinheiro',
    InputTag: 'Alimentação',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleAdd = () => {
    const { expenses, dispatch } = this.props;
    const { InputCurrency, InputDescription, InputMethod,
      InputTag, InputValue } = this.state;
    const Inputs = {
      InputValue,
      InputDescription,
      InputCurrency,
      InputMethod,
      InputTag,
      expenses };
    dispatch(ExpenseSaved(Inputs));
    this.setState({
      InputValue: '',
      InputDescription: '',
      InputCurrency: 'USD',
      InputMethod: 'Dinheiro',
      InputTag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { InputValue, InputDescription,
      InputCurrency, InputMethod, InputTag } = this.state;
    return (
      <form>
        <label>
          <input
            data-testid="value-input"
            type="number"
            onChange={ this.handleChange }
            name="InputValue"
            value={ InputValue }
          />
        </label>
        <label>
          <input
            data-testid="description-input"
            type="text"
            onChange={ this.handleChange }
            name="InputDescription"
            value={ InputDescription }
          />
        </label>
        <label>
          <select
            data-testid="currency-input"
            onChange={ this.handleChange }
            name="InputCurrency"
            value={ InputCurrency }
          >
            {
              currencies.map((currencie, index) => (
                <option key={ index } value={ currencie.toString() }>
                  {currencie}
                </option>
              ))
            }
          </select>
        </label>
        <label>
          <select
            data-testid="method-input"
            onChange={ this.handleChange }
            name="InputMethod"
            value={ InputMethod }
          >
            <option>
              Dinheiro
            </option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option>
              Cartão de débito
            </option>
          </select>
        </label>
        <label>
          <select
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="InputTag"
            value={ InputTag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleAdd }>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
