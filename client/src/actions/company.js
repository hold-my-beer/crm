import axios from 'axios';
import {
  GET_COMPANIES,
  SET_COMPANY_LOADING,
  COMPANY_ERROR,
  ADD_COMPANY
} from './types';
import { setAlert } from './alert';

// Get all companies
export const getCompanies = () => async dispatch => {
  dispatch(setCompanyLoading());

  try {
    const res = await axios.get('/api/companies');

    dispatch({
      type: GET_COMPANIES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COMPANY_ERROR,
      payload: errors
    });
  }
};

// Add company
export const addCompany = company => async dispatch => {
  console.log('in addCompany');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    name: company
  };

  try {
    const res = await axios.post('/api/companies', body, config);

    dispatch({
      type: ADD_COMPANY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COMPANY_ERROR,
      payload: errors
    });
  }
};

// Set company loading
export const setCompanyLoading = () => dispatch => {
  dispatch({
    type: SET_COMPANY_LOADING
  });
};
