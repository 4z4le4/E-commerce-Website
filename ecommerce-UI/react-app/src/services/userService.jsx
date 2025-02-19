import axios from "axios";
import { API_USER } from "./constant";
export default class UserService {
  insertUser = async (user) => {
    try {
      return await axios.post(API_USER, user);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // console.log("User not found");
      } else {
        // console.log("Error while fetching user:", error);
      }
      throw error;
    }
  };
  getUserByUserName = async (userName) => {
    try {
      return await axios.get(API_USER + "userName=" + userName);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // console.log("User not found");
      } else {
        // console.log("Error while fetching user:", error);
      }
      throw error;
    }
  };
  updateUser = async (id, user) => {
    try {
      return await axios.put(API_USER + id, user);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // console.log("User not found");
      } else {
        // console.log("Error while fetching user:", error);
      }
      throw error;
    }
  };
}
