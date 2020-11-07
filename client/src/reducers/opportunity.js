import {
  GET_OPPORTUNITIES,
  GET_OPPORTUNITY,
  ADD_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  SET_OPPORTUNITY_LOADING,
  OPPORTUNITY_ERROR
} from '../actions/types';

const initialState = {
  opportunities: [],
  opportunity: null,
  loading: false,
  errors: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OPPORTUNITIES:
      return {
        ...state,
        opportunities: payload,
        loading: false
      };
    case GET_OPPORTUNITY:
      return {
        ...state,
        opportunity: payload,
        loading: false
      };
    case ADD_OPPORTUNITY:
    case UPDATE_OPPORTUNITY:
      return {
        ...state,
        opportunity: payload,
        loading: false
      };
    case DELETE_OPPORTUNITY:
      return {
        ...state,
        opportunity: null,
        loading: false
      };
    case SET_OPPORTUNITY_LOADING:
      return {
        ...state,
        loading: true
      };
    case OPPORTUNITY_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
}
