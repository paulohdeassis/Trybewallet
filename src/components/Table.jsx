import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseAction, editExpenseAction } from '../redux/actions/Wallet';

class Table extends Component {
  handleExpenseRemove = (expenses) => {
    const { dispatch } = this.props;
    dispatch(removeExpenseAction(expenses));
  };

  handleEditExpense = ({ target }) => {
    const { id } = target.parentNode.parentNode;
    const { dispatch } = this.props;
    dispatch(editExpenseAction(id));
  };

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
        <tbody>
          {expenses.map((expense) => (
            <tr
              id={ expense.id }
              key={ expense.id }
            >
              <td>
                { expense.description }
              </td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td
                data-testid={ `expense-value-${expense.id}` }
              >
                { Number(expense.value).toFixed(2) }

              </td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              <td>
                { Number(Number(
                  expense.value,
                ) * expense.exchangeRates[expense.currency].ask).toFixed(2) }

              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ this.handleEditExpense }
                >
                  Editar despesa
                </button>

                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.handleExpenseRemove(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps, null)(Table);
