import {
  SHOW_DELETE,
  DELETE_CONFIRMED,
  DELETE_DECLINED,
  RESET_DELETE
} from '../actions/types';

const initialState = {
  className: 'delete-modal',
  confirmed: false,
  entity: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_DELETE:
      return {
        ...state,
        className: 'delete-modal show',
        entity: payload,
        confirmed: false
      };
    case DELETE_CONFIRMED:
      return {
        ...state,
        className: 'delete-modal',
        confirmed: true
      };
    case DELETE_DECLINED:
      return {
        ...state,
        className: 'delete-modal',
        confirmed: false
      };
    case RESET_DELETE:
      return initialState;
    default:
      return state;
  }
}
