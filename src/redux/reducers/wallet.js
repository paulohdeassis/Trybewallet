// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { ERROR, LOADING, SUCCESS } from '../actions/Wallet';
import { CURRENCY, EXPENSES, REMOVE_EXPENSE } from '../actions/Wallet';

const CURRENT_STATE = {
  currencies: [],
  expenses: [],
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
    };
  }

  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  }

  default:
    return state;
  }
};

export default walletReducer;
