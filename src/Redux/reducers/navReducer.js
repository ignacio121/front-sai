import { SET_NAV_DATA } from '../actions/navActions';

const initialState = {
  navPath: null,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV_DATA:
      return {
        ...state,
        navPath: action.payload,
      };
    default:
      return state;
  }
};

export default navReducer;
