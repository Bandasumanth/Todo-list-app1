import axios from 'axios';

const API_URL = 'https://todo-backend-2026-eehyevfmhbcjegga.southeastasia-01.azurewebsites.net/api/tasks';

export const getTasks = () => axios.get(API_URL);
export const addTask = (title) => axios.post(API_URL, { title });
export const updateTask = (id, title) => axios.put(`${API_URL}/${id}`, { title });
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const toggleComplete = (id) => axios.patch(`${API_URL}/${id}/complete`);