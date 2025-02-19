import {
    CART_CLEAR_STATE,
  CART_DELETE_PRODUCT,
  CART_GET_ALL,
  CART_INSERT,
  COMMON_ERROR_SET,
  COMMON_MESSAGE_SET,
} from "./actionType";
import CartService from "../../services/cartService";
export const insertCart = (cart) => async (dispatch) => {
 
  const cartService = new CartService();
  try {
    const response = await cartService.insertCart(cart);
    if (response.status === 201) {
      dispatch({
        type: CART_INSERT,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Product was added!",
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
export const getCartsByIdUser = (idUser) => async (dispatch) => {
  const cartService = new CartService();
  try {
    const response = await cartService.getCartByIdUser(idUser);
    if (response.status === 200) {
      dispatch({
        type: CART_GET_ALL,
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
      payload: "Cart does not available!",
    });
  }
};
export const clearStateCart = ()=>async (dispatch)=>{
    dispatch({
        type:CART_CLEAR_STATE
    })
}
export const deleteByProductId = (id)=>async (dispatch)=>{
  const cartService = new CartService();
  try {
    const response = await cartService.deleteProductId(id
    );
    if(response.status === 204 ){
      dispatch({
        type:CART_DELETE_PRODUCT,
        payload:id
      })
      
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Product were not existed!",
    });
  }
}
export const deleteByUserId = (idUser)=>async (dispatch)=>{
  const cartService = new CartService();
  try {
    const response = await cartService.deleteUserId(idUser
    );
    if(response.status === 204 ){
      dispatch({
        type:CART_CLEAR_STATE,
      })
      
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Product were not existed!",
    });
  }
}