// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { ADD_USER } from '../actions';
import { SUCCEEDED_REQUEST, SUCCEEDED_EXPENSE, REMOVE_USER, EDIT_USER } from '../actions';

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
  case SUCCEEDED_EXPENSE:
    console.log(payload);
    return {
      ...state,
      expenses: [...state.expenses, ...payload],
    };
  case REMOVE_USER:
    return {
      ...state,
      expenses: [...payload],
    };
  case EDIT_USER:
    return {
      ...state,
      expenses: [...payload] };
  default:
    return state;
  }
};

export default walletReducer;
