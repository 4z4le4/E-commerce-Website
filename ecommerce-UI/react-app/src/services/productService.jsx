import axios from "axios";
import { API_PRODUCT } from "./constant";
export default class ProductService {
  insertProduct = async (formData) => {
    try {
      return await axios.post(API_PRODUCT, formData);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("formData not found");
      } else {
        console.log("Error while fetching formData:", error);
      }
      throw error;
    }
  };
  getAllProducts = async () => {
    try {
      return await axios.get(API_PRODUCT);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("product not found");
      } else {
        console.log("Error while fetching product:", error);
      }
      throw error;
    }
  };
  changeStatus = async (status,id) => {
    try {
      return await axios.put(API_PRODUCT+`?status=${status}&id=${id}`);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("product not found");
      } else {
        console.log("Error while fetching product:", error);
      }
      throw error;
    }
  };
  updateProduct = async (id,formData) => {
    try {
      return await axios.put(API_PRODUCT+id, formData);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("product not found");
      } else {
        console.log("Error while fetching product:", error);
      }
      throw error;
    }
  };
  updateProductV2 = async (id,formData) => {
    try {
      return await axios.put(API_PRODUCT+"v2/"+id, formData);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("product not found");
      } else {
        console.log("Error while fetching product:", error);
      }
      throw error;
    }
  };
  getProductById = async (id)=>{
    try {
      return await axios.get(API_PRODUCT+id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("product not found");
      } else {
        console.log("Error while fetching product:", error);
      }
      throw error;
    }
  }
  deleteProductById = async (id)=>{
    try {
      return await axios.delete(API_PRODUCT+id);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Product not found");
      } else {
        console.log("Error while fetching Product:", error);
      }
      throw error;
    }
  }
}
