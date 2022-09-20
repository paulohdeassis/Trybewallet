import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { handleCurrencyResponse,
  handleExpensesResponse,
  handleEditExpense } from '../redux/actions/Wallet';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleCurrencyResponse());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch, onEdit, idEdit } = this.props;

    if (onEdit) {
      console.log(idEdit);
      dispatch(handleEditExpense(this.state, idEdit));
    } else {
      dispatch(handleExpensesResponse(this.state));
      this.setState((prev) => ({ id: prev.id + 1 }));
    }

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies, onEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (

      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            name="value"
            id="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="method">
          Selecione a moeda
          <select
            name="currency"
            id="method"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies.map((money, index) => (
              <option key={ index } value={ money }>{money}</option>
            ))}
          </select>
        </label>

        <label htmlFor="payment-method">
          Método de pagamento
          <select
            id="payment-method"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="expense-categorie">
          Tipo de gasto
          <select
            id="expense-categorie"
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" data-testid="add-edit-btn" onClick={ this.handleClick }>
          {(onEdit) ? 'Editar despesa'
            : 'Adicionar Despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onEdit: PropTypes.bool.isRequired,
  idEdit: PropTypes.string.isRequired,

};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  onEdit: state.wallet.onEdit,
  idEdit: state.wallet.idEdit,

});
export default connect(mapStateToProps, null)(WalletForm);
