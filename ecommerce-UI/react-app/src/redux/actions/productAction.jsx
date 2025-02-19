import ProductService from "../../services/productService";
import {
  COMMON_ERROR_SET,
  COMMON_MESSAGE_SET,
  PRODUCTS_GET_ALL,
  PRODUCT_CLEAR_STATE,
  PRODUCT_DELETE,
  PRODUCT_INSERT,
  PRODUCT_SET,
  PRODUCT_UPDATE,
  PRODUCTS_GET_ALL_ACTIVE,
  PRODUCTS_GET_ALL_INACTIVE,
} from "./actionType";

export const insertProduct = (formData, navigate) => async (dispatch) => {
  const productService = new ProductService();
  try {
    const response = await productService.insertProduct(formData);

    if (response.status === 201) {
      dispatch({
        type: PRODUCT_INSERT,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Product was saved!",
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.data.message,
      });
    }
    if(response.data.status === "Active"){
      navigate("/admin/productAdmin/list");
    }else{
      navigate("/admin/productAdmin/recycleBin");
    }
    
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Something was wrong!",
    });
  }
};
export const getAllProducts = () => async (dispatch) => {
  const productService = new ProductService();

  try {
    const response = await productService.getAllProducts();
    if (response.status === 200) {
      dispatch({
        type: PRODUCTS_GET_ALL,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Products does not available!",
    });
  }
};
export const getAllProductsActive = () => async (dispatch) => {
  const productService = new ProductService();

  try {
    const response = await productService.getAllProducts();
    if (response.status === 200) {
      dispatch({
        type: PRODUCTS_GET_ALL_ACTIVE,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Products does not available!",
    });
  }
};
export const getAllProductsInactive = () => async (dispatch) => {
  const productService = new ProductService();

  try {
    const response = await productService.getAllProducts();
    if (response.status === 200) {
      dispatch({
        type: PRODUCTS_GET_ALL_INACTIVE,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Products does not available!",
    });
  }
};
export const clearStateProduct = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CLEAR_STATE,
  });
};
export const setProductState = (id) => async (dispatch) => {
  const productService = new ProductService();
  try {
    const response = await productService.getProductById(id);
    if (response.status === 200) {
      dispatch({
        type: PRODUCT_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: "Product wasnt existed!",
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data.message,
    });
  }
};
export const updateProductV2 = (id, formData, navigate) => async (dispatch) => {
  const productService = new ProductService();
  try {
    const response = await productService.updateProductV2(id, formData);
    if (response.status === 200) {
      dispatch({
        type: PRODUCT_UPDATE,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Product was updated!",
      });
    }
    if(response.data.status === "Active"){
      navigate("/admin/productAdmin/list");
    }else{
      navigate("/admin/productAdmin/recycleBin");
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Name was existed!",
    });
  }
  
};
export const updateProduct = (id, formData, navigate) => async (dispatch) => {
  const productService = new ProductService();
  try {
    const response = await productService.updateProduct(id, formData);
    if (response.status === 200) {
      dispatch({
        type: PRODUCT_UPDATE,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Product was updated!",
      });
    }
    if(response.data.status === "Active"){
      navigate("/admin/productAdmin/list");
    }else{
      navigate("/admin/productAdmin/recycleBin");
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Name was existed!",
    });
  }
  
};
export const changeStatus = (id, status, navigate) => async (dispatch) => {
  const productService = new ProductService();
  try {
    const response = await productService.changeStatus(status,id);
    if (response.status === 200) {
      dispatch({
        type: PRODUCT_UPDATE,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Product was updated!",
      });
    }
    if(response.data.status === "Active"){
      navigate("/admin/productAdmin/list");
    }else{
      navigate("/admin/productAdmin/recycleBin");
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Name was existed!",
    });
  }
  
};
export const deleteProductById = (id)=>async (dispatch)=>{
  const productService = new ProductService();
  try {
    const response = await productService.deleteProductById(id
    );
    if(response.status === 204 ){
      dispatch({
        type:PRODUCT_DELETE,
        payload:id
      })
      dispatch({
        type:COMMON_MESSAGE_SET,
        payload:"Product was deleted!"
      })
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Product were not existed!",
    });
  }
}