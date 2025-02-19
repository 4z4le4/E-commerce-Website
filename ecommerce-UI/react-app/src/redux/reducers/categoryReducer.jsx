import {
  CATEGORIES_GET_ALL,
  CATEGORIES_GET_ALL_ACTIVE,
  CATEGORIES_GET_ALL_INACTIVE,
  CATEGORY_CLEAR_STATE,
  CATEGORY_DELETE,
  CATEGORY_INSERT,
  CATEGORY_SET,
  CATEGORY_UPDATE,
} from "../actions/actionType";

const initialState = {
  category: {},
  categories: [],
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_INSERT:
      return { ...state, category: payload };
    case CATEGORIES_GET_ALL:
      return { ...state, categories: payload };
    case CATEGORIES_GET_ALL_ACTIVE:
      return {
        ...state,
        categories: payload.filter((item) => item.status === "Visible"),
      };
    case CATEGORIES_GET_ALL_INACTIVE:
      return {
        ...state,
        categories: payload.filter((item) => item.status === "Invisible"),
      };
    case CATEGORY_CLEAR_STATE:
      return { ...state, category: {}, categories: [] };
    case CATEGORY_SET:
      return { ...state, category: payload };
    case CATEGORY_UPDATE:
      return { ...state, category: {}, categories: [] };
    case CATEGORY_DELETE:
      return {
        ...state,
        categories: state.categories.filter((item) => item.id !== payload),
      };
    default:
      return state;
  }
};
export default categoryReducer;
