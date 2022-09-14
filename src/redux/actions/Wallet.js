import { getCurrency, getExpenses } from '../../services/apiRequests';

export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';
export const REMOVE_CURRENCY = 'REMOVE_CURRENCY';

export const currencyAction = (currencies) => ({
  type: CURRENCY,
  payload: currencies,
});

/* (export const expensesAction = (expenses) => ({
  type: EXPENSES,
  payload: expenses,
}) */

export const handleCurrencyResponse = () => async (dispatch) => {
  const apiResponse = await getCurrency();
  const filteredArray = Object.keys(apiResponse);
  const result = filteredArray.filter((currency) => currency !== 'USDT');
  return dispatch(currencyAction(result));
};

/* const handleExpensesResponse = async (dispatch) => {
  const expensesApi = await getExpenses();

}; */
