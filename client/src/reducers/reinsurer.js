import {
  GET_REINSURERS,
  REINSURER_ERROR,
  SET_REINSURER_LOADING
} from '../actions/types';

const initialState = {
  reinsurers: [],
  loading: false,
  errors: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REINSURERS:
      return {
        ...state,
        reinsurers: payload,
        loading: false
      };
    case REINSURER_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case SET_REINSURER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
