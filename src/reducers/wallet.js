import { SET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    console.log('entrei no case');
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
