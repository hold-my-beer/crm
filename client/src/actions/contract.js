import axios from 'axios';
import { ADD_CONTRACTS, CONTRACT_ERROR, SET_CONTRACT_LOADING } from './types';
import { setAlert, removeAlert } from './alert';

// Add contracts
export const addContracts = formData => async dispatch => {
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
