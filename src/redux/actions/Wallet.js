import { getCurrency, getExpenses } from '../../services/apiRequests';

export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const currencyAction = (currencies) => ({
  type: CURRENCY,
  payload: currencies,
});

export const expensesAction = (expenses) => ({
  type: EXPENSES,
  payload: expenses,
});

export const removeExpenseAction = (expenses) => ({
  type: REMOVE_EXPENSE,
  payload: expenses,
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
