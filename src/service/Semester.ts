import api from './Api';
import { BASE_URL } from '../constant';

export const apiGetSemesterInfo = async () => {
  const url = BASE_URL + '/semesters/get-current';
  const response = await api.get(url);
  return response;
};
