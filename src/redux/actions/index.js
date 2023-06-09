export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SUCCEEDED_REQUEST = 'SUCCEEDED_REQUEST';
export const SUCCEEDED_EXPENSE = 'SUCCEEDED_EXPENSE';

export const LoginUser = (payload) => ({
  type: ADD_USER,
  payload,
});

const succeedRequest = (payload) => ({
  type: SUCCEEDED_REQUEST,
  payload,
});

const succeedExpense = (payload) => ({
  type: SUCCEEDED_EXPENSE,
  payload,
});

export const removeExpense = (payload) => ({
  type: REMOVE_USER,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_USER,
  payload,
});
export const FetchApi = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.entries(data)
      .map((item) => item[0]).filter((item) => item !== 'USDT');
    dispatch(succeedRequest(currencies));
  } catch (error) {
    console.log(error);
  }
};

export const ExpenseSaved = ({
  InputValue,
  InputDescription,
  InputCurrency,
  InputMethod,
  InputTag,
  expenses,
}) => (async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    let NewInput = '-';
    if (InputDescription !== '') {
      NewInput = InputDescription;
    }
    const expense = {
      id: expenses.length,
      value: InputValue,
      description: NewInput,
      currency: InputCurrency,
      method: InputMethod,
      tag: InputTag,
      exchangeRates: data,
    };
    dispatch(succeedExpense([expense]));
  } catch (error) {
    console.log(error);
  }
});
