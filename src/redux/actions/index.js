export const ADD_USER = 'ADD_USER';
export const SUCCEEDED_REQUEST = 'SUCCEEDED_REQUEST';

export const LoginUser = (payload) => ({
  type: ADD_USER,
  payload,
});

const succeedRequest = (payload) => ({
  type: SUCCEEDED_REQUEST,
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
