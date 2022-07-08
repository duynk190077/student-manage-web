import IState from '../interfaces/State';
import {
  SET_STATE,
  SET_LIST_SUBJECT,
  SET_SEMESTER,
  SET_LIST_CLASS,
} from './constant';

export const initState: IState = {
  userId: '',
  userInfo: null,
  accessToken: '',
  role: '',
  listSubject: [],
  listClass: [],
  semester: '',
  week: 0,
  status: '',
};

function reducer(state: IState, action: any) {
  switch (action.type) {
    case SET_STATE: {
      return {
        ...state,
        ...action.payload,
        listSubject: [],
      };
    }
    case SET_LIST_SUBJECT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_SEMESTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_LIST_CLASS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
