import axios from 'axios';
import {
  ADD_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
  SET_OPPORTUNITY_LOADING,
  OPPORTUNITY_ERROR,
  GET_OPPORTUNITIES,
  GET_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  RESET_DELETE
} from './types';
import { setAlert, removeAlert } from './alert';

// Get all opportunities
export const getOpportunities = () => async dispatch => {
  dispatch(removeAlert());

  dispatch(setOpportunityLoading());

  try {
    const res = await axios.get('/api/opportunities');

    dispatch({
      type: GET_OPPORTUNITIES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: OPPORTUNITY_ERROR,
      payload: errors
    });
  }
};

// Get opportunity by id
export const getOpportunityById = id => async dispatch => {
  dispatch(setOpportunityLoading());

  try {
    const res = await axios.get(`/api/opportunities/${id}`);

    dispatch({
      type: GET_OPPORTUNITY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: OPPORTUNITY_ERROR,
      payload: errors
    });
  }
};

// Add opportunity
export const addOpportunity = (formData, history) => async dispatch => {
  dispatch(removeAlert());

  dispatch(setOpportunityLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/opportunities', formData, config);

    dispatch({
      type: ADD_OPPORTUNITY,
      payload: res.data
    });

    history.push('/opportunities');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: OPPORTUNITY_ERROR,
      payload: errors
    });
  }
};

// Update opportunity
export const updateOpportunity = (id, formData, history) => async dispatch => {
  dispatch(removeAlert());

  dispatch(setOpportunityLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/opportunities/${id}`, formData, config);

    dispatch({
      type: UPDATE_OPPORTUNITY,
      payload: res.data
    });

    history.push('/opportunities');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: OPPORTUNITY_ERROR,
      payload: errors
    });
  }
};

// Delete opportunity
export const removeOpportunity = (id, history) => async dispatch => {
  console.log('in delete action');
  dispatch(setOpportunityLoading());

  try {
    const res = await axios.delete(`/api/opportunities/${id}`);

    dispatch({
      type: RESET_DELETE
    });

    dispatch({
      type: DELETE_OPPORTUNITY,
      payload: id
    });

    // dispatch(setAlert(res.data.msg, 'success'));

    history.push('/opportunities');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: OPPORTUNITY_ERROR,
      payload: errors
    });
  }
};

export const setOpportunityLoading = () => dispatch => {
  dispatch({
    type: SET_OPPORTUNITY_LOADING
  });
};
