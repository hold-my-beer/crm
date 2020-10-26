import axios from 'axios';
import {
  GET_REINSURERS,
  REINSURER_ERROR,
  SET_REINSURER_LOADING
} from './types';
import { setAlert } from './alert';

// Get all reinsurers
export const getReinsurers = () => async dispatch => {
  dispatch(setReinsurerLoading());

  try {
    const res = await axios.get('/api/reinsurers');

    dispatch({
      type: GET_REINSURERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REINSURER_ERROR,
      payload: errors
    });
  }
};

// Set reinsurer loading
export const setReinsurerLoading = () => dispatch => {
  dispatch({
    type: SET_REINSURER_LOADING
  });
};
