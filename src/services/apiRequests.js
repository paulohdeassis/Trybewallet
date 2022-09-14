export const getCurrency = async () => {
  const apiEndpoint = 'https://economia.awesomeapi.com.br/json/all';
  const result = await fetch(apiEndpoint);
  const jsonReturn = await result.json();
  return jsonReturn;
};

export const getExpenses = async () => {
  const apiEndpoint = 'https://economia.awesomeapi.com.br/json/all';
  const result = await fetch(apiEndpoint);
  const expensesObj = await result.json();
  return expensesObj;
};
