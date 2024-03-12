import api from './Api';
import { BASE_URL } from '../constant';

export const apiGetAllClassRoom = async () => {
  const url = BASE_URL + '/classrooms';
  const response = await api.get(url);
  return response;
};
