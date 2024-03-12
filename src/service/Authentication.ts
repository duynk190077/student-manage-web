import { BASE_URL } from '../constant';
import api from './Api';

export const apiLogin = (data: any) => {
  let url = BASE_URL + '/users/login';
  const res = api.post(url, data);
  return res;
};

export const apiGetUserInfo = () => {
  let url = BASE_URL + '/users/user-info';
  const res = api.get(url);
  return res;
};
