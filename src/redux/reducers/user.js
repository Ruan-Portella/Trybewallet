import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_USER: {
    return {
      ...state,
      email: payload,
    };
  }
  default:
    return state;
  }
};

export default userReducer;
