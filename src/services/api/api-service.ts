import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export const getData = async (endpoint: string, params?: {[key: string]: any}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (endpoint: string, data: {[key: string]: any}) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const patchData = async (endpoint: string, data: {[key: string]: any}) => {
  try {
    const response = await api.patch(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error patching data:', error);
    throw error;
  }
};

export const putData = async (endpoint: string, data: {[key: string]: any}) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error putting data:', error);
    throw error;
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export default api;