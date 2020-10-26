import axios from 'axios';
import {
  ADD_OPPORTUNITY,
  SET_OPPORTUNITY_LOADING,
  OPPORTUNITY_ERROR,
  GET_OPPORTUNITIES
} from './types';
import { setAlert, removeAlert } from './alert';
// import { addCompany } from './company';
// import { addBroker } from './broker';

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

// Add opportunity
export const addOpportunity = formData => async dispatch => {
  dispatch(removeAlert());

  dispatch(setOpportunityLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    // if (!formData.companyId) {
    //   const company = await addCompany(formData.company);
    //   formData.companyId = company._id;
    // }

    // if (!formData.brokerId) {
    //   const broker = await addBroker(formData.broker);
    //   formData.brokerId = broker._id;
    // }
    // console.log(formData);
    const res = await axios.post('/api/opportunities', formData, config);

    dispatch({
      type: ADD_OPPORTUNITY,
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

export const setOpportunityLoading = () => dispatch => {
  dispatch({
    type: SET_OPPORTUNITY_LOADING
  });
};
