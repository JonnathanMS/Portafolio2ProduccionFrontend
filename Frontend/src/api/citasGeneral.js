import axios from './axios.js'

export const getCitasGeneralRequest = () => axios.get('/citasGeneral');  // para obtener todas las tareas.

export const getCitasGeneralUserRequest = () => axios.get('/citasGeneral/user');  // para obtener todas las tareas.

export const getCitasGeneralTutorRequest = (code) => axios.get(`/citasGeneralT/${code}`); // para obtener una sola tarea identificada con su id.

export const getCitaGeneralRequest = (id) => axios.get(`/citasGeneral/${id}`); // para obtener una sola tarea identificada con su id.

export const createCitaGeneralRequest = (citaGeneral) => axios.post('/citasGeneral', citaGeneral);

// export const updateCitasGeneralRequest = (citaGeneral) => axios.put(`/citasGeneral/${citaGeneral._id}`, citaGeneral);
export const updateCitasGeneralRequest = (id, citaGeneral) => axios.put(`/citasGeneral/${id}`, citaGeneral);

export const deleteCitasGeneralRequest = (id) => axios.delete(`/citasGeneral/${id}`);