import axios from 'axios';

const baseAxiosInstanceAdmin = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/admin`,
  withCredentials: true,
});

export default baseAxiosInstanceAdmin;
