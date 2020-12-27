import axios from 'axios';
import {
  ADD_LEAD,
  UPDATE_LEAD,
  SET_LEAD_LOADING,
  LEAD_ERROR,
  GET_LEADS,
  GET_NEAREST_LEADS,
  GET_LEAD,
  DELETE_LEAD,
  RESET_DELETE
} from './types';
import { setAlert, removeAlert } from './alert';

// Get all leads
export const getLeads = () => async dispatch => {
  dispatch(removeAlert());

  dispatch(setLeadLoading());

  try {
    const res = await axios.get('/api/leads');

    dispatch({
      type: GET_LEADS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LEAD_ERROR,
      payload: errors
    });
  }
};

// Get limited number of nearest leads by contact date
export const getNearestLeads = (limit = 3) => async dispatch => {
  dispatch(setLeadLoading());

  dispatch(removeAlert());

  try {
    const params = new URLSearchParams();
    params.set('limit', limit);

    const res = await axios.get('/api/leads/nearest', { params: params });

    dispatch({
      type: GET_NEAREST_LEADS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LEAD_ERROR,
      payload: errors
    });
  }
};

// Get lead by id
export const getLeadById = id => async dispatch => {
  dispatch(setLeadLoading());

  try {
    const res = await axios.get(`/api/leads/${id}`);

    dispatch({
      type: GET_LEAD,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LEAD_ERROR,
      payload: errors
    });
  }
};

// Add lead
export const addLead = (formData, history) => async dispatch => {
  dispatch(removeAlert());

  dispatch(setLeadLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/leads', formData, config);

    dispatch({
      type: ADD_LEAD,
      payload: res.data
    });

    history.push('/leads');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LEAD_ERROR,
      payload: errors
    });
  }
};

// Update lead
export const updateLead = (id, formData, history) => async dispatch => {
  dispatch(removeAlert());

  dispatch(setLeadLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/leads/${id}`, formData, config);

    dispatch({
      type: UPDATE_LEAD,
      payload: res.data
    });

    history.push('/leads');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LEAD_ERROR,
      payload: errors
    });
  }
};

// Delete lead
export const removeLead = (id, history) => async dispatch => {
  dispatch(setLeadLoading());

  try {
    await axios.delete(`/api/leads/${id}`);

    dispatch({
      type: RESET_DELETE
    });

    dispatch({
      type: DELETE_LEAD,
      payload: id
    });

    history.push('/leads');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LEAD_ERROR,
      payload: errors
    });
  }
};

export const setLeadLoading = () => dispatch => {
  dispatch({
    type: SET_LEAD_LOADING
  });
};
