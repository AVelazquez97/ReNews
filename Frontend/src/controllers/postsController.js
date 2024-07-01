import {API_URL} from "../const.js";
import axios from "axios";
const controllerPath = `${API_URL}/posts/`;

export const getOwnedPosts = async (userId) => {
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
}