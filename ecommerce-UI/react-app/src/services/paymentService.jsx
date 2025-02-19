import axios from "axios";
import { API_PAYMENT } from "./constant";
export default class PaymentService {
  insertOrderInfo = async (orderInfo) => {
    try {
      return await axios.post(API_PAYMENT, orderInfo);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("orderinfo not found");
      } else {
        console.log("Error while fetching orderinfo:", error);
      }
      throw error;
    }
  };
  insertOrder = async (idOrderInfo, idsCart) => {
    try {
      return await axios.post(API_PAYMENT + idOrderInfo, idsCart);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("orderinfo not found");
      } else {
        console.log("Error while fetching orderinfo:", error);
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
  getAllOrderInfo = async () => {
    try {
      return await axios.get(API_PAYMENT);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("orderinfo not found");
      } else {
        console.log("Error while fetching orderinfo:", error);
      }
      throw error;
    }
  };

  getCartsByIdOrderInfo = async (idOrderInfo) => {
    try {
      return await axios.get(API_PAYMENT + idOrderInfo);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("idOrderInfo not found");
      } else {
        console.log("Error while fetching idOrderInfo:", error);
      }
      throw error;
    }
  };
  getOrderInfosByUserId = async (idUser) => {
    try {
      return await axios.get(API_PAYMENT + "idUser=" + idUser);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("idUser not found");
      } else {
        console.log("Error while fetching idUser:", error);
      }
      throw error;
    }
  };
  setStatus = async (orderInfo) => {
    try {
      return await axios.put(API_PAYMENT,orderInfo);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("orderInfo not found");
      } else {
        console.log("Error while fetching orderInfo:", error);
      }
      throw error;
    }
  };
  //   deleteCategoryById = async (id)=>{
  //     try {
  //       return await axios.delete(API_CATEGORY+id);
  //     } catch (error) {
  //       if (error.response && error.response.status === 500) {
  //         console.log("category not found");
  //       } else {
  //         console.log("Error while fetching category:", error);
  //       }
  //       throw error;
  //     }
  //   }
}
