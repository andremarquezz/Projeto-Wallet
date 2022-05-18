export const USER_LOGIN = 'USER_LOGIN';
export const setUser = (payload) => ({
  type: USER_LOGIN,
  payload: {
    email: payload.email,
    password: payload.password,
  },
});
