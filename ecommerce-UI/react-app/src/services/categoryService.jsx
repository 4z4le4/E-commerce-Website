import axios from "axios";
import { API_CATEGORY } from "./constant";
export default class CategoryService {
  insertCategory = async (category) => {
    try {
      return await axios.post(API_CATEGORY, category);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("category not found");
      } else {
        console.log("Error while fetching category:", error);
      }
      throw error;
    }
  };
  updateCategory = async (id,category) => {
    try {
      return await axios.put(API_CATEGORY+id, category);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("category not found");
      } else {
        console.log("Error while fetching category:", error);
      }
      throw error;
    }
  };
  changeStatus = async (status,id) => {
    try {
      return await axios.put(API_CATEGORY+`?status=${status}&id=${id}`);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("category not found");
      } else {
        console.log("Error while fetching category:", error);
      }
      throw error;
    }
  };
  getAllCategories = async () => {
    try {
      return await axios.get(API_CATEGORY, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("category not found");
      } else {
        console.log("Error while fetching category:", error);
      }
      throw error;
    }
  };
  getCategoryById = async (id)=>{
    try {
      return await axios.get(API_CATEGORY+id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("category not found");
      } else {
        console.log("Error while fetching category:", error);
      }
      throw error;
    }
  }
  deleteCategoryById = async (id)=>{
    try {
      return await axios.delete(API_CATEGORY+id);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("category not found");
      } else {
        console.log("Error while fetching category:", error);
      }
      throw error;
    }
  }
  
}