import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { handleCurrencyResponse } from '../redux/actions/Wallet';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleCurrencyResponse());
  }

  render() {
    const { currencies } = this.props;
    /* const { dispatch } = this.props;
    dispatch(Wallet()); */

    return (

      <form>
        <label htmlFor="value-input">
          Valor
          <input
            type="text"
            name="value-input"
            id="value-input"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            name="description"
            id="description"
          />
        </label>

        <label htmlFor="select-currency">
          Selecione a moeda
          <select
            name="select-currency"
            id="select-currency"
            data-testid="currency-input"
          >
            {currencies.map((currency, index) => (
              <option key={ index } value={ currency }>{currency}</option>
            ))}
          </select>
        </label>

        <label htmlFor="payment-method">
          Método de pagamento
          <select id="payment-method" name="payment-method" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="expense-categorie">
          Tipo de gasto
          <select id="expense-categorie" name="expense-categorie" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,

});
export default connect(mapStateToProps, null)(WalletForm);
