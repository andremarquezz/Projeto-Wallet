export const USER_LOGIN = 'USER_LOGIN';
export const setUser = (payload) => ({
  type: USER_LOGIN,
  payload: {
    email: payload.email,
    password: payload.password,
  },
});

export const SET_CURRENCIES = 'SET_CURRENCIES';
export const setCurrencies = (payload) => ({
  type: SET_CURRENCIES,
  payload,
});

export const getCurrenciesAPI = () => async (dispatch) => {
  const api = 'https://economia.awesomeapi.com.br/json/all';
  const data = await (await fetch(api)).json();
  const currenciesFilter = Object.keys(data).filter((currency) => currency !== 'USDT');
  dispatch(setCurrencies(currenciesFilter));
};

export const SET_EXPENSE = 'SET_EXPENSE';
export const setExpenses = (payload) => ({
  type: SET_EXPENSE,
  payload,
});
