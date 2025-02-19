import axios from "axios";
import { API_CART } from "./constant";
export default class CartService {
  insertCart = async (cart) => {
    try {
      return await axios.post(API_CART, cart);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("cart not found");
      } else {
        console.log("Error while fetching cart:", error);
      }
      throw error;
    }
  };
//   updateCategory = async (id,category) => {
//     try {
//       return await axios.put(API_CATEGORY+id, category);
//     } catch (error) {
//       if (error.response && error.response.status === 500) {
//         console.log("category not found");
//       } else {
//         console.log("Error while fetching category:", error);
//       }
//       throw error;
//     }
//   };
//   getAllCategories = async () => {
//     try {
//       return await axios.get(API_CATEGORY);
//     } catch (error) {
//       if (error.response && error.response.status === 500) {
//         console.log("category not found");
//       } else {
//         console.log("Error while fetching category:", error);
//       }
//       throw error;
//     }
//   };
  getCartByIdUser = async (id)=>{
    try {
      return await axios.get(API_CART+id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("cart not found");
      } else {
        console.log("Error while fetching cart:", error);
      }
      throw error;
    }
  }
  deleteProductId = async (id)=>{
    try {
      return await axios.delete(API_CART+id);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("product not found");
      } else {
        console.log("Error while fetching product:", error);
      }
      throw error;
    }
  }
  deleteUserId = async (idUser)=>{
    try {
      return await axios.delete(API_CART+"userId="+idUser);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("User not found");
      } else {
        console.log("Error while fetching user:", error);
      }
      throw error;
    }
  }
  
}