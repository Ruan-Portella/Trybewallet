import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
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
              </tr>
            </tbody>
          ))
        }
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
