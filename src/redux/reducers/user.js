import { USER_EMAIL } from '../actions/index';

const CURRENT_STATE = {
  email: '',
};

const loginReducer = (state = CURRENT_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL: {
    return {
      ...state,
      email: action.payload.email,
    };
  }
  default:
    return state;
  }
};

export default loginReducer;
