import {
  PAYMENT_CLEAR_CARTS,
  PAYMENT_CLEAR_STATE,
  PAYMENT_GET_ORDER_INFO_USER,
  PAYMENT_INSERT_ORDER_INFO,
  PAYMENT_SET_CARTS,
  PAYMENT_SET_STATUS,
} from "../actions/actionType";

const initialState = {
  orderInfo: {},
  orderInfos: [],
  cartsPay: [],
};

const paymentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PAYMENT_INSERT_ORDER_INFO:
      return { ...state, orderInfo: payload };
    case PAYMENT_SET_CARTS:
      return { ...state, cartsPay: payload };
    case PAYMENT_GET_ORDER_INFO_USER:
      return { ...state, orderInfos: payload };
    case PAYMENT_CLEAR_CARTS:
      return { ...state, cartsPay: [] };
    case PAYMENT_CLEAR_STATE:
      return { ...state, orderInfo: {}, orderInfos: [], cartsPay: [] };
    case PAYMENT_SET_STATUS:
      let newOrderInfos = state.orderInfos.filter(
        (item) => item.id !== payload.id
      );
      let updatedOrderInfo = payload;
      newOrderInfos.push(updatedOrderInfo);
      return { ...state, orderInfos: newOrderInfos };
    default:
      return state;
  }
};
export default paymentReducer;
