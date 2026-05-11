import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = () => axios.get(API_URL);
export const addTask = (title) => axios.post(API_URL, { title });
export const updateTask = (id, title) => axios.put(`${API_URL}/${id}`, { title });
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const toggleComplete = (id) => axios.patch(`${API_URL}/${id}/complete`);