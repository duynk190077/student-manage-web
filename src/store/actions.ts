import {
  SET_STATE,
  SET_LIST_SUBJECT,
  SET_SEMESTER,
  SET_LIST_CLASS,
} from './constant';
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

export const setSemester = (payload: any) => {
  return {
    type: SET_SEMESTER,
    payload,
  };
};

export const setListClass = (payload: any) => {
  return {
    type: SET_LIST_CLASS,
    payload,
  };
};
