import axios from 'axios';
import { GET_ENTITIES, ENTITY_ERROR, SET_ENTITY_LOADING } from './types';
import { setAlert } from './alert';

// Get all entities
export const getEntities = () => async dispatch => {
  dispatch(setEntityLoading());

  try {
    const res = await axios.get('/api/entities');

    dispatch({
      type: GET_ENTITIES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ENTITY_ERROR,
      payload: errors
    });
  }
};

// Set entity loading
export const setEntityLoading = () => dispatch => {
  dispatch({
    type: SET_ENTITY_LOADING
  });
};
