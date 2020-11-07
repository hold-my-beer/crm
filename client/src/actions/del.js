import { SHOW_DELETE, DELETE_CONFIRMED, DELETE_DECLINED } from './types';

// Show delete modal
export const showDelete = entity => dispatch => {
  dispatch({
    type: SHOW_DELETE,
    payload: entity
  });
};

// Confirm delete
export const confirmDelete = () => dispatch => {
  dispatch({
    type: DELETE_CONFIRMED
  });
};

// Decline delete
export const declineDelete = () => dispatch => {
  dispatch({
    type: DELETE_DECLINED
  });
};
