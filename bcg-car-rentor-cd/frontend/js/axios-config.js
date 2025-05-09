// Import local d'Axios depuis node_modules
import axios from 'axios';
import { baseUrl } from '../apis/api.js';
// Configuration de base
const axiosInstance = axios.create({
    baseURL: baseUrl, // Remplacez par votre URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;