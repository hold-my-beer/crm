import {
  GET_CONSTANTS,
  CONSTANTS_ERROR,
  SET_CONSTANTS_LOADING
} from '../actions/types';

const initialState = {
  constant: {},
  errors: [],
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONSTANTS:
      return {
        ...state,
        constant: payload,
        loading: false
      };
    case CONSTANTS_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case SET_CONSTANTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
