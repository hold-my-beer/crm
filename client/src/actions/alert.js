import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

// Set alert
export const setAlert = (msg, alertType) => dispatch => {
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};

// Remove alert
export const removeAlert = () => dispatch => {
  dispatch({
    type: REMOVE_ALERT
  });
};
