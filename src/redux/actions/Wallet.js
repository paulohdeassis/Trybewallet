import { getCurrency, getExpenses } from '../../services/apiRequests';

export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const HANDLE_EDIT = 'HANDLE_EDIT';

export const currencyAction = (currencies) => ({
  type: CURRENCY,
  payload: currencies,
});

export const expensesAction = (expenses) => ({
  type: EXPENSES,
  payload: expenses,
});

export const removeExpenseAction = (expenseId) => ({
  type: REMOVE_EXPENSE,
  payload: expenseId,
});

export const editExpenseAction = (expenseId) => ({
  type: EDIT_EXPENSE,
  payload: expenseId,
});

export const handleEditExpense = (expense, id) => ({
  type: HANDLE_EDIT,
  payload: { expense,
    id },

});
export const handleCurrencyResponse = () => async (dispatch) => {
  const apiResponse = await getCurrency();
  const filteredArray = Object.keys(apiResponse);
  const result = filteredArray.filter((currency) => currency !== 'USDT');
  return dispatch(currencyAction(result));
};

export const handleExpensesResponse = (expense) => async (dispatch) => {
  const apiResponse = await getExpenses();

  const allExpenses = {
    ...expense,
    exchangeRates: apiResponse,

  };

  return dispatch(expensesAction(allExpenses));
};
