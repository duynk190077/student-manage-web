import api from './Api';
import { BASE_URL } from '../constant';

export const apiUpdateStudent = async (data: any) => {
  let url = BASE_URL + `/students/${data.student.id}`;
  const response = await api.put(url, data);
  return response;
};
