import IState from '../interfaces/State';
import { SET_STATE, SET_LIST_SUBJECT } from './constant';

export const initState: IState = {
  userId: '',
  userInfo: null,
  accessToken: '',
  role: '',
  listSubject: [],
};

function reducer(state: IState, action: any) {
  switch (action.type) {
    case SET_STATE: {
      return {
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
    default: {
      return state;
    }
  }
}

export default reducer;
