import instructorAxiosInstance from '../../axios/instructorAxiosInstance';

interface RequestData {
  expertise: string[];
  qualifications: string[];
  additionalInfo: string[];
}

export const sendRequest = async (data: RequestData) => {
  try {
    const response = await instructorAxiosInstance.post('/api/request', data);
    console.log('req data', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = async () => {
  try {
    const response = await instructorAxiosInstance.get('/api/user');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRequest = async () => {
  try {
    const response = await instructorAxiosInstance.get('/api/request');
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
