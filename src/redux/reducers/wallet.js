// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { ERROR, LOADING, SUCCESS } from '../actions/Wallet';
import { CURRENCY,
  EXPENSES,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  HANDLE_EDIT } from '../actions/Wallet';

const CURRENT_STATE = {
  currencies: [],
  expenses: [],
  idEdit: '',
  onEdit: false,
};

const walletReducer = (state = CURRENT_STATE, action) => {
  switch (action.type) {
  case CURRENCY: {
    return {
      ...state,
      currencies: action.payload,
    };
  }

  case EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      onEdit: false,
    };
  }

  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  }

  case EDIT_EXPENSE: {
    return {
      ...state,
      onEdit: true,
      idEdit: action.payload,
    };
  }
  case HANDLE_EDIT: {
    return {
      ...state,
      onEdit: false,
      expenses: state.expenses.map((despesa) => {
        if (despesa.id === parseInt(action.payload.id, 10)) {
          const { currency, description, method, tag, value } = action.payload.expense;
          const { id, exchangeRates } = despesa;

          return {
            id, currency, exchangeRates, method, tag, value, description,
          };
        }
        return despesa;
      }) }; }

  default:
    return state;
  }
};

export default walletReducer;
