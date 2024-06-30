import {API_URL} from "../const.js";
import axios from "axios";
const controllerPath = `${API_URL}/tags`;

export const getTags = async () => {
    try{
        const response = await axios.get(`${controllerPath}`);
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
};

export const createTag = async (tagData) => {
    try{
        const response = await axios.post(`${controllerPath}`, tagData);
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