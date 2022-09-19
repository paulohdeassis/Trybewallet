// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { ERROR, LOADING, SUCCESS } from '../actions/Wallet';
import { CURRENCY, EXPENSES } from '../actions/Wallet';

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

  default:
    return state;
  }
};

export default walletReducer;
