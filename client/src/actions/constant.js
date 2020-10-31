import axios from 'axios';
import { GET_CONSTANTS, CONSTANTS_ERROR, SET_CONSTANTS_LOADING } from './types';

import { setAlert } from './alert';

// Get constants
export const getConstants = () => async dispatch => {
  dispatch(setConstantsLoading());

  try {
    const res = await axios.get('/api/constants');

    dispatch({
      type: GET_CONSTANTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CONSTANTS_ERROR,
      payload: errors
    });
  }
};

// Set constants loading
export const setConstantsLoading = () => dispatch => {
  dispatch({
    type: SET_CONSTANTS_LOADING
  });
};
