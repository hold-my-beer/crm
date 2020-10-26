import { GET_USERS, USER_ERROR, SET_USER_LOADING } from '../actions/types';

const initialState = {
  users: [],
  loading: false,
  errors: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
