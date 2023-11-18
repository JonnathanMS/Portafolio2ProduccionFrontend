import axios from "axios";

const instance = axios.create({ // nos permite establecer en axios cual va a ser el dominio base al que va a consultar
    baseURL: 'http://localhost:4000/api',
    withCredentials: true  // Con esta linea establecemos las cookies en esa rura de baseUrl
})

export default instance;