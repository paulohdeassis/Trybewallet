import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  getSumOfExpenses = () => {
    const { expenses } = this.props;
    console.log(expenses);

    const AllExpenses = expenses.reduce((acc, index) => (
      acc + index.value * index.exchangeRates[index.currency].ask), 0);
    const expensesWithDecimals = AllExpenses.toFixed(2);

    return expensesWithDecimals;
  };

  render() {
    const { email } = this.props;
    return (
      <>
        <h2 data-testid="email-field">{email}</h2>
        <h3 data-testid="total-field">{this.getSumOfExpenses()}</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps, null)(Header);
