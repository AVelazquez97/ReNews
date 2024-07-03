import {API_URL} from "../const.js";
import axios from "axios";
const controllerPath = `${API_URL}/posts`;

export const getOwnedPosts = async (userId) => {
    try{
        const response = await axios.get(`${controllerPath}/user/${userId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404 && error.response.data.messages.error === "No Posts Found") {
                return [];
            }
            throw new Error(`Error ${error.response.status}, intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const getPosts = async () => {
    try{
        const response = await axios.get(controllerPath);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404 && error.response.data.messages.error === "No Posts Found") {
                return [];
            }
            throw new Error(`Error ${error.response.status}, intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const createPost = async (postData) => {
    try{
        const response = await axios.post(controllerPath, postData);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const searchPosts = async (search) => {
    try{
        const response = await axios.get(`${controllerPath}/search/${search}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const deletePost = async (postId) => {
    try{
        const response = await axios.delete(`${controllerPath}/${postId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const getPendingPosts = async () => {
    try {
        const response = await axios.get(`${controllerPath}/pending`);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404 && error.response.data.messages.error === "No Pending Posts Found") {
                return [];
            }
            throw new Error(`Error ${error.response.status}, intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const approvePost = async (postId) => {
    try{
        const response = await axios.put(`${controllerPath}/approve/${postId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const createComment = async (postId, commentData) => {
    try{
        const response = await axios.post(`${controllerPath}/${postId}/comment`, commentData);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}

export const deleteComment = async (postId, commentId) => {
    try{
        const response = await axios.delete(`${controllerPath}/${postId}/comment/${commentId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error ${error.response.status}, intente nuevamente.`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}