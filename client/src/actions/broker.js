import axios from 'axios';
import {
  GET_BROKERS,
  ADD_BROKER,
  BROKER_ERROR,
  SET_BROKER_LOADING
} from './types';
import { setAlert } from './alert';

// Get all brokers
export const getBrokers = () => async dispatch => {
  dispatch(setBrokerLoading());

  try {
    const res = await axios.get('/api/brokers');

    dispatch({
      type: GET_BROKERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: BROKER_ERROR,
      payload: errors
    });
  }
};

// Add broker
export const addBroker = broker => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    name: broker
  };

  try {
    const res = await axios.post('/api/brokers', body, config);

    dispatch({
      type: ADD_BROKER,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: BROKER_ERROR,
      payload: errors
    });
  }
};

// Set broker loading
export const setBrokerLoading = () => dispatch => {
  dispatch({
    type: SET_BROKER_LOADING
  });
};
