import axios from 'axios';
import {
  GET_CONTRACTS,
  GET_CONTRACT,
  ADD_CONTRACTS,
  UPDATE_CONTRACT,
  CONTRACT_ERROR,
  SET_CONTRACT_LOADING
} from './types';
import { setAlert, removeAlert } from './alert';

// Get all contracts
export const getContracts = () => async dispatch => {
  dispatch(setContractLoading());

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

//

// Set contract loading
export const setContractLoading = () => dispatch => {
  dispatch({
    type: SET_CONTRACT_LOADING
  });
};
