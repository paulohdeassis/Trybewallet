// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { ERROR, LOADING, SUCCESS } from '../actions/Wallet';
import { CURRENCY } from '../actions/Wallet';

const CURRENT_STATE = {
  currencies: [],
};

const walletReducer = (state = CURRENT_STATE, action) => {
  switch (action.type) {
  case CURRENCY: {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  /* case LOADING: {
    return {
      ...state,
      loading: true,
    };
  }
  case ERROR: {
    return action.payload.error;
  } */
  default:
    return state;
  }
};

export default walletReducer;
