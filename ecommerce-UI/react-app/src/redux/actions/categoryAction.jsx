import {
  CATEGORIES_GET_ALL,
  CATEGORIES_GET_ALL_ACTIVE,
  CATEGORIES_GET_ALL_INACTIVE,
  CATEGORY_CLEAR_STATE,
  CATEGORY_DELETE,
  CATEGORY_INSERT,
  CATEGORY_SET,
  CATEGORY_UPDATE,
  COMMON_ERROR_SET,
  COMMON_MESSAGE_SET,
} from "./actionType";
import CategoryService from "../../services/categoryService";

export const insertCategory = (category, navigate) => async (dispatch) => {
  const categoryService = new CategoryService();
  try {
    const response = await categoryService.insertCategory(category);

    if (response.status === 201) {
      dispatch({
        type: CATEGORY_INSERT,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Category was saved!",
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.data.message,
      });
    }
    navigate("/admin/categoryAdmin/list");
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Name category was existed!",
    });
  }
};
export const getAllCategories = () => async (dispatch) => {
  const categoryService = new CategoryService();
  try {
    const response = await categoryService.getAllCategories();

    if (response.status === 200) {
      dispatch({
        type: CATEGORIES_GET_ALL,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Category does not available!",
    });
  }
};
export const getAllCategoriesActive = () => async (dispatch) => {
  const categoryService = new CategoryService();
  try {
    const response = await categoryService.getAllCategories();

    if (response.status === 200) {
      dispatch({
        type: CATEGORIES_GET_ALL_ACTIVE,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Category does not available!",
    });
  }
};
export const getAllCategoriesInactive = () => async (dispatch) => {
  const categoryService = new CategoryService();
  try {
    const response = await categoryService.getAllCategories();

    if (response.status === 200) {
      dispatch({
        type: CATEGORIES_GET_ALL_INACTIVE,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Category does not available!",
    });
  }
};
export const setCategoryState = (id) => async (dispatch) => {
  const categoryService = new CategoryService();
  try {
    const response = await categoryService.getCategoryById(id);
    if (response.status === 200) {
      dispatch({
        type: CATEGORY_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: "Category wasnt existed!",
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data.message,
    });
  }
};
export const updateCategory = (category, navigate) => async (dispatch) => {
  const categoryService = new CategoryService();
  try {
    const response = await categoryService.updateCategory(
      category.id,
      category
    );
    if (response.status === 200) {
      dispatch({
        type: CATEGORY_UPDATE,
        payload:response.data
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Category was updated!",
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Name was existed!",
    });
  }
  navigate("/admin/categoryAdmin/list");
};
export const changeStatus = (status, id,navigate) => async (dispatch) => {
  const categoryService = new CategoryService();
  try {
    const response = await categoryService.changeStatus(
      status,id
    );
    if (response.status === 200) {
      dispatch({
        type: CATEGORY_UPDATE,
        payload:response.data
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Category was updated!",
      });
    }
    if(response.data.status === "Visible"){
      navigate("/admin/categoryAdmin/list");
    }else{
      navigate("/admin/categoryAdmin/recycleBin");
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Name was existed!",
    });
  }
  
};
export const deleteCategoryById = (id)=>async (dispatch)=>{
  const categoryService = new CategoryService();
  try {
    const response = await categoryService.deleteCategoryById(id
    );
    if(response.status === 204 ){
      dispatch({
        type:CATEGORY_DELETE,
        payload:id
      })
      dispatch({
        type:COMMON_MESSAGE_SET,
        payload:"Category was deleted!"
      })
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Category were not existed!",
    });
  }
}
export const clearStateCategory = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_CLEAR_STATE,
  });
};
