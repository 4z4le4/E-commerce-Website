import {
  COMMON_ERROR_SET,
  COMMON_MESSAGE_SET,
  PAYMENT_CLEAR_CARTS,
  PAYMENT_CLEAR_STATE,
  PAYMENT_GET_ORDER_INFO_USER,
  PAYMENT_INSERT_ORDER_INFO,
  PAYMENT_SET_CARTS,
  PAYMENT_SET_STATUS,
} from "./actionType";
import PaymentService from "../../services/paymentService";
let idOderInfo;
export const insertOrderInfo = (orderInfo) => async (dispatch) => {
  const paymentService = new PaymentService();
  
  try {
    const response = await paymentService.insertOrderInfo(orderInfo);
    if (response.status === 200) {
        idOderInfo = response.data.id;
      dispatch({
        type: PAYMENT_INSERT_ORDER_INFO,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Something was wrong!",
    });
  }
};
export const insertOrder = (idsCart) => async (dispatch) => {
    const paymentService = new PaymentService();
    try {
      const response = await paymentService.insertOrder(idOderInfo,idsCart);
  
      if (response.status === 200) {
        dispatch({
          type: PAYMENT_SET_CARTS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: COMMON_ERROR_SET,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: "Something was wrong!",
      });
    }
  };
  export const getAllOrderInfoByIdUser = (idUser) => async (dispatch) => {
    const paymentService = new PaymentService();
    try {
      const response = await paymentService.getOrderInfosByUserId(idUser);
  
      if (response.status === 200) {
        dispatch({
          type: PAYMENT_GET_ORDER_INFO_USER,
          payload: response.data,
        });
      } else {
        dispatch({
          type: COMMON_ERROR_SET,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: "Something was wrong!",
      });
    }
  };
  export const getAllOrderInfo = () => async (dispatch) => {
    const paymentService = new PaymentService();
    try {
      const response = await paymentService.getAllOrderInfo();
  
      if (response.status === 200) {
        dispatch({
          type: PAYMENT_GET_ORDER_INFO_USER,
          payload: response.data,
        });
      } else {
        dispatch({
          type: COMMON_ERROR_SET,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: "Something was wrong!",
      });
    }
  };
  export const getAllCartsByOrderInfo = (id) => async (dispatch) => {
    const paymentService = new PaymentService();
    try {
      const response = await paymentService.getCartsByIdOrderInfo(id);
  
      if (response.status === 200) {
        dispatch({
          type: PAYMENT_SET_CARTS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: COMMON_ERROR_SET,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: "Something was wrong!",
      });
    }
  };
  export const setStatus = (orderInfo) => async (dispatch) => {
    const paymentService = new PaymentService();
    try {
      const response = await paymentService.setStatus(orderInfo);

      if (response.status === 200) {
        dispatch({
          type: PAYMENT_SET_STATUS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: COMMON_ERROR_SET,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: "Something was wrong!",
      });
    }
  };
  export const clearPaymentState =  ()=>async(dispatch)=>{
    dispatch({
        type:PAYMENT_CLEAR_STATE,
    })
  }
  export const clearCartsPay =  ()=>async(dispatch)=>{
    dispatch({
        type:PAYMENT_CLEAR_CARTS,
    })
  }