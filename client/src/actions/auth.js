import axios from 'axios';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  SET_AUTH_LOADING,
  REMOVE_ALERT
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  dispatch(setAuthLoading());

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  dispatch({
    type: REMOVE_ALERT
  });

  dispatch(setAuthLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    // console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout user
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

// Change password
export const changePassword = password => async dispatch => {
  dispatch({
    type: REMOVE_ALERT
  });

  dispatch(setAuthLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ password });

  try {
    const res = await axios.post('/api/users/password', body, config);

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS
    });

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CHANGE_PASSWORD_FAIL
    });
  }
};

// Set auth loading
export const setAuthLoading = () => dispatch => {
  dispatch({
    type: SET_AUTH_LOADING
  });
};
