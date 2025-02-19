import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
const initialState = {};

function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState, 
  });

  return store;
}
export default configureAppStore(initialState)