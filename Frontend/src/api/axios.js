import axios from "axios";

const instance = axios.create({ // nos permite establecer en axios cual va a ser el dominio base al que va a consultar
    // baseURL: 'http://localhost:8080/api', // local
    baseURL: 'https://nuevobackend.onrender.com/api', // endpoint del backend
    withCredentials: true  // Con esta linea establecemos las cookies en esa rura de baseUrl
})

export default instance;