import axios from "axios";

const API_BASE_URL = "http://localhost:9090/blog";

export const createBlog = async (blogData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, blogData, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating blog:", error);
        throw error;
    }
};

export const getAll = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/all`, {
            headers: {"Content-Type": "application/json"}
        });
        return response.data;

    } catch (error){
        console.error("Error getting blogs from database ble", error);
        throw error;
    }

};

export const deleteBlog = async (id) => {
  try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${id}`, {
          headers: { "Content-Type": "application/json" }
      });
      return response.data;
  }  catch (error) {
      console.error("Error blog could not be deleted. Try again.", error);
      throw error;
  }
};
