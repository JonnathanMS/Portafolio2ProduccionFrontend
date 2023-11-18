import axios from './axios.js'

export const getTasksRequest = () => axios.get('/tasks');  // para obtener todas las tareas.

export const getTaskRequest = (id) => axios.get(`/tasks/${id}`); // para obtener una sola tarea identificada con su id.

export const createTaskRequest = (task) => axios.post('/tasks', task);

// export const updateTasksRequest = (task) => axios.put(`/tasks/${task._id}`, task);
export const updateTasksRequest = (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteTasksRequest = (id) => axios.delete(`/tasks/${id}`);