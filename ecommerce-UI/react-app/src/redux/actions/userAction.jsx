import UserService from "../../services/userService";
import {
  USER_GET_BY_USERNAME,
  USER_INSERT,
  COMMON_ERROR_SET,
  COMMON_MESSAGE_SET,
  USER_CLEAR_STATE,
} from "./actionType";
export const setUser = (user) => async (dispatch) => {
  dispatch({ type: USER_GET_BY_USERNAME, payload: user });
};
export const updateUser = (id,user) => async (dispatch) => {
  const userService = new UserService();
  try {
    const response = await userService.updateUser(id,user);
    if (response.status === 200) {
      dispatch({
        type: USER_GET_BY_USERNAME,
        payload: response.data
      });
      
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Updated",
      });
    }else{
      dispatch({
      type: COMMON_ERROR_SET,
      payload: "Update failed!",
    })};
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Sever error",
    });
  
  }
};
export const insertUser = (user, navigate) => async (dispatch) => {
  const userService = new UserService();
  try {
    const response = await userService.insertUser(user);
    if (response.status === 201) {
      dispatch({
        type: USER_INSERT,
      });
      
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Register successfully!",
      });
      navigate("/login");
    }else{
      dispatch({
      type: COMMON_ERROR_SET,
      payload: "Register failed",
    })};
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "User was existed!",
    });
    navigate("/register");
  }
};
export const getUserByUserName = (user, navigate) => async (dispatch) => {
  const userService = new UserService();

  try {
    const response = await userService.getUserByUserName(user.userName);
    if (response.status === 200) {
      if (response.data.password == user.password) {
        dispatch({
          type: USER_GET_BY_USERNAME,
          payload: response.data,
        });
        navigate("/");
        if (response.data.type == "User") {
          navigate("/");
        }
        if (response.data.type == "Admin") {
          navigate("/admin/categoryAdmin/add");
        }
      } else {
        dispatch({
          type: COMMON_ERROR_SET,
          payload: "Wrong password!",
        });
      }
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      // payload: error.response.data.message,
      payload: "Wrong username!",
    });
  }
};
export const clearStateUser = () => async (dispatch) => {
  dispatch({
    type: USER_CLEAR_STATE,
  });
};
