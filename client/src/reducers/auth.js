import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  SET_AUTH_LOADING
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case CHANGE_PASSWORD_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case CHANGE_PASSWORD_FAIL:
      return state;
    default:
      return state;
  }
}
