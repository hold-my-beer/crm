import axios from 'axios';
import {
  GET_ACTIVITY_TYPES,
  ACTIVITY_TYPE_ERROR,
  SET_ACTIVITY_TYPE_LOADING
} from './types';
import { setAlert } from './alert';

// Get all activity types
export const getActivityTypes = () => async dispatch => {
  dispatch(setActivityTypeLoading());

  try {
    const res = await axios.get('/api/activityTypes');

    dispatch({
      type: GET_ACTIVITY_TYPES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ACTIVITY_TYPE_ERROR,
      payload: errors
    });
  }
};

// Set activity type loading
export const setActivityTypeLoading = () => dispatch => {
  dispatch({
    type: SET_ACTIVITY_TYPE_LOADING
  });
};
