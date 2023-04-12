import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  handleRemove = (id) => {
    const { expenses, dispatch } = this.props;
    const removeItem = expenses.filter((expense) => expense.id !== id);
    dispatch(removeExpense(removeItem));
  };

  render() {
    const { expenses, handleEdit } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th data-testid="valueth">Valor</th>
            <th data-testid="moedath">Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {
          expenses.map((expense) => (
            <tbody key={ expense.id }>
              <tr>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{`${expense.value}.00`}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {`R$ 
              ${(expense.value * expense.exchangeRates[expense.currency].ask)
              .toFixed(2)}`}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => handleEdit({
                      id: expense.id,
                      value: expense.value,
                      description: expense.description,
                      currency: expense.currency,
                      method: expense.method,
                      tag: expense.tag,
                    }) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleRemove(expense.id) }

                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          ))
        }
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
