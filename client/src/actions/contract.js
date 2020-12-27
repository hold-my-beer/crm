import axios from 'axios';
import {
  GET_CONTRACTS,
  GET_NEAREST_CONTRACTS,
  GET_CONTRACT,
  ADD_CONTRACTS,
  UPDATE_CONTRACT,
  DELETE_CONTRACT,
  CONTRACT_ERROR,
  SET_CONTRACT_LOADING,
  RESET_DELETE
} from './types';
import { setAlert, removeAlert } from './alert';

// Get all contracts
export const getContracts = () => async dispatch => {
  dispatch(setContractLoading());

  dispatch(removeAlert());

  try {
    const res = await axios.get('/api/contracts');

    dispatch({
      type: GET_CONTRACTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CONTRACT_ERROR,
      payload: errors
    });
  }
};

// Get limited number of nearest contracts by start date
export const getNearestContracts = (limit = 3) => async dispatch => {
  dispatch(setContractLoading());

  dispatch(removeAlert());

  try {
    const params = new URLSearchParams();
    params.set('limit', limit);

    const res = await axios.get('/api/contracts/nearest', { params: params });

    dispatch({
      type: GET_NEAREST_CONTRACTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CONTRACT_ERROR,
      payload: errors
    });
  }
};

// Get contract by id
export const getContractById = id => async dispatch => {
  dispatch(setContractLoading());

  try {
    const res = await axios.get(`/api/contracts/${id}`);

    dispatch({
      type: GET_CONTRACT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CONTRACT_ERROR,
      payload: errors
    });
  }
};

// Add contracts
export const addContracts = (formData, history) => async dispatch => {
  dispatch(removeAlert());

  dispatch(setContractLoading());

  const config = {
    headers: {
      'Contract-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/contracts', formData, config);

    dispatch({
      type: ADD_CONTRACTS,
      payload: res.data
    });

    history.push('/contracts');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CONTRACT_ERROR,
      payload: errors
    });
  }
};

// Update contract
export const updateContract = (id, formData, history) => async dispatch => {
  dispatch(removeAlert());

  dispatch(setContractLoading());

  const config = {
    headers: {
      'Contract-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/contracts/${id}`, formData, config);

    dispatch({
      type: UPDATE_CONTRACT,
      payload: res.data
    });

    history.push('/contracts');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CONTRACT_ERROR,
      payload: errors
    });
  }
};

// Remove contract
export const removeContract = (id, history) => async dispatch => {
  dispatch(setContractLoading());

  try {
    await axios.delete(`/api/contracts/${id}`);

    dispatch({
      type: RESET_DELETE
    });

    dispatch({
      type: DELETE_CONTRACT,
      payload: id
    });

    history.push('/contracts');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CONTRACT_ERROR,
      payload: errors
    });
  }
};

// Set contract loading
export const setContractLoading = () => dispatch => {
  dispatch({
    type: SET_CONTRACT_LOADING
  });
};
