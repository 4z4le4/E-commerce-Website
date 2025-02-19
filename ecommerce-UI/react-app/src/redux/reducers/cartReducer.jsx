import {
  CART_SET,
  CART_INSERT,
  CART_CLEAR_STATE,
  CART_GET_ALL,
  CART_DELETE_PRODUCT,
} from "../actions/actionType";

const initialState = {
  cart: {},
  carts: [],
  count: 0,
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_INSERT:
      return { ...state, cart: payload };
    case CART_GET_ALL:
      return { ...state, carts: payload, count: payload.length };
    case CART_CLEAR_STATE:
      return { ...state, cart: {}, carts: [], count: 0 };
    case CART_SET:
      return { ...state, cart: payload };
    case CART_DELETE_PRODUCT:
      return {
        ...state,
        carts: state.carts.filter((item) => item.productDto.id !== payload),
        count: state.count - 1,
      };
    default:
      return state;
  }
};
export default categoryReducer;
