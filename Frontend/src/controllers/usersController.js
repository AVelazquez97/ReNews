import {API_URL} from "../const.js";
import axios from "axios";
const controllerPath = `${API_URL}/users/`;

export const getUsers = async () => {
    const response = await axios.get(`${controllerPath}`);
    return response.data;
};

export const registerUser = async (formData) => {
    const response = await axios.post(`${controllerPath}register`, formData);
    return response.data;
};

export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${controllerPath}login`, formData);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, verifique que los datos ingresados sean correctos e intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const forgotPassword = async (mail) => {
    try {
        const response = await axios.post(`${controllerPath}forgotPassword`, {email: mail});
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, verifique que el correo ingresado pertenezca a un usuario valido e intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const getUser = async (userId) => {
    try{
        const response = await axios.get(`${controllerPath}${userId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, verifique que el usuario exista e intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
};

export const deleteUser = async (userId) => {
    try{
        const response = await axios.delete(`${controllerPath}${userId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, verifique que el usuario exista e intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const elevateUser = async (userId) => {
    try{
        const response = await axios.put(`${controllerPath}/makeAdmin/${userId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, verifique que el usuario exista e intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const updateUser = async (userId, data) => {
    try{
        const response = await axios.put(`${controllerPath}${userId}`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, verifique que el usuario exista e intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}