import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/User/Home";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import CategoryAdmin from "./components/category/CategoryAdmin";
import AddOrEditCategory from "./components/category/AddOrEditCategory";
import ListCategory from "./components/category/ListCategory";
import RecycleBinCategory from "./components/category/RecycleBinCategory";
import ProductAdmin from "./components/product/ProductAdmin";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart";
import Invoice from "./components/invoice/Invoice";
import OrderInfo from "./components/Order/OrderInfo";
import store from "./redux/store";
import AddOrEditProduct from "./components/product/AddOrEditProduct";
import ListProductAdmin from "./components/product/ListProductAdmin";
import RecycleBinProduct from "./components/product/RecycleBinProduct";
import ShoppingHistory from "./components/history/ShoppingHistory";
import { Provider } from "react-redux";
import Register from "./pages/register/Register";
import RegisterAdmin from "./pages/register/RegisterAdmin";
import ProfileUser from "./components/Profile/ProfileUser"
import ChangePassword from "./components/Profile/ChangePassword"
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route index path="/" element={<Home />}></Route>
            <Route path="/" element={<Home />}>
              <Route path="/about" element={<About />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/product" element={<Product />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/orderInfo" element={<OrderInfo />}></Route>
              <Route path="/history" element={<ShoppingHistory />}></Route>
              <Route path="/profileUser" element={<ProfileUser />}></Route>
              <Route path="/changePassword" element={<ChangePassword />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>

            <Route path="/admin" element={<Admin />}>
              <Route path="/admin/categoryAdmin" element={<CategoryAdmin />}>
                <Route
                  path="/admin/categoryAdmin/add"
                  element={<AddOrEditCategory />}
                ></Route>
                <Route
                  path="/admin/categoryAdmin/update/:id"
                  element={<AddOrEditCategory />}
                ></Route>
                <Route
                  path="/admin/categoryAdmin/list"
                  element={<ListCategory />}
                ></Route>
                <Route
                  path="/admin/categoryAdmin/recycleBin"
                  element={<RecycleBinCategory />}
                ></Route>
              </Route>
              <Route path="/admin/productAdmin" element={<ProductAdmin />}>
                <Route
                  path="/admin/productAdmin/add"
                  element={<AddOrEditProduct />}
                ></Route>
                <Route
                  path="/admin/productAdmin/update/:id"
                  element={<AddOrEditProduct />}
                ></Route>
                <Route
                  path="/admin/productAdmin/list"
                  element={<ListProductAdmin />}
                ></Route>
                <Route
                  path="/admin/productAdmin/recycleBin"
                  element={<RecycleBinProduct />}
                ></Route>
              </Route>
              <Route path="/admin/invoice" element={<Invoice />}></Route>
              <Route path="/admin/registerAdmin" element={<RegisterAdmin />}></Route>
            </Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    );
  }
}
export default App;
