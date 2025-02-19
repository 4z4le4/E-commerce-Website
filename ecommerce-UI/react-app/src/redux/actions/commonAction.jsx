import { COMMON_ERROR_SET, COMMON_LOADING_SET, COMMON_MESSAGE_SET } from "./actionType";

export const setMessage = (message) => (dispatch) => {
  dispatch({
    type: COMMON_MESSAGE_SET,
    payload: message,
  });
};
export const setError = (error) => (dispatch) => {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error,
    });
  };
  export const setLoading = (loading) => (dispatch) => {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: loading,
    });
  };