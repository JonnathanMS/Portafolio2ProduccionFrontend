//import axios from 'axios'
import axios from './axios.js'

// const API = 'http://localhost:4000/api'

// Aqui estamos haciendo una peticion post con el usuario que vendra en el reques.body
// export const registerRequest = user => axios.post(`${API}/register`, user);
export const registerRequest = user => axios.post(`/register`, user); // quitamos el ${API}  porque ya lo pusimos en axios.js
export const updatePasswordRequest = user => axios.put(`/cambiarContrasena`, user); // quitamos el ${API}  porque ya lo pusimos en axios.js

// export const loginRequest = user => axios.post(`${API}/login`, user);
export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify') // permite verificar el token para saber si ya esta autenticado.

// export const logoutRequest=()=>axios.get ('/logout') 