import {
  USER_GET_BY_USERNAME,
  USER_CLEAR_STATE,
  USER_INSERT,
} from "../actions/actionType";
const initialState = {
  user: {},
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_GET_BY_USERNAME:
      const newState = { ...state, user: payload };
      localStorage.setItem("user",JSON.stringify(newState.user));
      return newState;
    case USER_CLEAR_STATE:
      const newState1 =  {
        ...state,
        user: {},
      };
      localStorage.setItem("user",JSON.stringify(newState1.user));
      return newState1;
    case USER_INSERT:
      const newState2 = {
        ...state,
        user: {},
      };
      localStorage.setItem("user",JSON.stringify(newState2.user));
      return newState2;
    default:
      return state;
  }
};
export default userReducer;
