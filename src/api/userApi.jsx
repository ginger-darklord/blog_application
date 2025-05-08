import axios from "axios";

const API_BASE_URL = "http://localhost:9090/user";

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, userData, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (err){
        console.error("could not create ur ass, sucks for u", err);
        throw err;
    }
}

export const logIn = async (userData) => {
    try {
       const response = await axios.post(`${API_BASE_URL}/logIn`, userData, {
           headers: { "Content-Type": "application/json" }
       })
        return response.data;
    } catch (err) {
        console.error("forget ur password or secretly a spy? susssss")
        throw err;
    }
}