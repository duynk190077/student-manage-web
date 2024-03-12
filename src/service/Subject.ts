import api from './Api';
import { BASE_URL } from '../constant';

export const apiGetAllSubject = async () => {
  const url = BASE_URL + '/subjects';
  const response = await api.get(url);
  return response;
};
