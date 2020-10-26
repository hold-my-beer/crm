import axios from 'axios';
import { GET_USERS, USER_ERROR, SET_USER_LOADING } from './types';
import { setAlert } from './alert';

// Get all users
export const getUsers = () => async dispatch => {
  dispatch(setUserLoading());

  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: USER_ERROR,
      payload: errors
    });
  }
};

// Set user loading
export const setUserLoading = () => dispatch => {
  dispatch({
    type: SET_USER_LOADING
  });
};
