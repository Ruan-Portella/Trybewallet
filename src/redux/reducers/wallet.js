// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { ADD_USER } from '../actions';

import { SUCCEEDED_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SUCCEEDED_REQUEST:
    return {
      ...state,
      currencies: payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
