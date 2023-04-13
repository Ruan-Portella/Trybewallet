/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, ExpenseSaved } from '../redux/actions';
import '../styles/WalletForm.css';
import Table from './Table';

class WalletForm extends Component {
  state = {
    InputValue: '',
    InputDescription: '',
    InputCurrency: 'USD',
    InputMethod: 'Dinheiro',
    InputTag: 'Alimentação',
    editForm: false,
    idEdited: 0,
    validate: true,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.validateFields);
  };

  validateFields = () => {
    const { InputValue } = this.state;
    const MAX_LENGTH = 1;
    const validateValue = InputValue.length >= MAX_LENGTH;
    this.setState({
      validate: !(validateValue),
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

  handleEdit = ({ id, value, description, currency, method, tag }) => {
    this.setState({
      InputValue: value,
      InputDescription: description,
      InputCurrency: currency,
      InputMethod: method,
      InputTag: tag,
      editForm: true,
      idEdited: id,
    });
  };

  handleEdited = (id) => {
    const { expenses, dispatch } = this.props;
    const { InputCurrency, InputDescription, InputMethod,
      InputTag, InputValue } = this.state;
    expenses[id].value = InputValue;
    expenses[id].description = InputDescription;
    expenses[id].currency = InputCurrency;
    expenses[id].method = InputMethod;
    expenses[id].tag = InputTag;
    dispatch(editExpense(expenses));
    this.setState({
      InputValue: '',
      InputDescription: '',
      InputCurrency: 'USD',
      InputMethod: 'Dinheiro',
      InputTag: 'Alimentação',
      editForm: false,
      idEdited: 0,
    });
  };

  render() {
    const { currencies } = this.props;
    const { InputValue, InputDescription,
      InputCurrency, InputMethod, InputTag, editForm, idEdited, validate } = this.state;
    return (
      <section className="MainContent">
        <section className="TableForm">
          <section className="TableContent">
            <section className="inputValue">
              <label htmlFor="value">Valor </label>
              <input
                id="value"
                placeholder="0"
                data-testid="value-input"
                type="number"
                onChange={ this.handleChange }
                name="InputValue"
                value={ InputValue }
              />
            </section>
            <section className="inputDescription">
              <label htmlFor="description">Descrição da Despesa</label>
              <input
                id="description"
                placeholder="Mercado"
                data-testid="description-input"
                type="text"
                onChange={ this.handleChange }
                name="InputDescription"
                value={ InputDescription }
              />
            </section>
            <section className="inputCurrency">
              <label htmlFor="currency">  Moeda </label>
              <select
                id="currency"
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
            </section>
            <section className="inputMethod">
              <label htmlFor="method">Método de Pagamento</label>
              <select
                id="method"
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
            </section>
            <section className="inputTag">
              <label htmlFor="tag">Categoria da Despesa</label>
              <select
                id="tag"
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
            </section>
          </section>
        </section>
        <section className="mainButton">
          <section className="buttonForm">
            <section className="button">
              {
                editForm ? (
                  <button
                    type="button"
                    onClick={ () => this.handleEdited(idEdited) }
                  >
                    Editar despesa

                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={ this.handleAdd }
                    disabled={ validate }
                  >
                    Adicionar despesa

                  </button>)
              }
            </section>
            {
              validate && (
                <p className="Error">
                  <span className="asteristico">*</span>
                  Insira um Valor maior que 0
                </p>)
            }
          </section>
        </section>
        <Table handleEdit={ this.handleEdit } />
      </section>
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
