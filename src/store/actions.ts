import { SET_STATE, SET_LIST_SUBJECT } from './constant';
import IState from '../interfaces/State';

export const setState = (payload: IState) => {
  return {
    type: SET_STATE,
    payload,
  };
};

export const setListSubject = (payload: any) => {
  return {
    type: SET_LIST_SUBJECT,
    payload,
  };
};
