import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import commonReducer from "./reducers/commonReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import paymentReducer from "./reducers/paymentReducer"
const rootReducer = combineReducers({
  userReducer,
  commonReducer,
  categoryReducer,
  productReducer,
  cartReducer,
  paymentReducer
});
export default rootReducer;
