import {API_URL} from "../const.js";
import axios from "axios";
const controllerPath = `${API_URL}/users/`;

export const getUsers = async () => {
    const response = await axios.get(`${controllerPath}`);
    return response.data;
};

export const registerUser = async (formData) => {
    const response = await axios.post(`${controllerPath}register`, [formData]);
    return response.data;
};

export const loginUser = async (formData) => {
    const response = await axios.post(`${controllerPath}login`, [formData]);
    return response.data;
}