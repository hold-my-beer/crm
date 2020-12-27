import {
  GET_LEADS,
  GET_NEAREST_LEADS,
  GET_LEAD,
  ADD_LEAD,
  UPDATE_LEAD,
  DELETE_LEAD,
  SET_LEAD_LOADING,
  LEAD_ERROR
} from '../actions/types';

const initialState = {
  leads: [],
  lead: null,
  loading: false,
  errors: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEADS:
    case GET_NEAREST_LEADS:
      return {
        ...state,
        leads: payload,
        loading: false
      };
    case GET_LEAD:
      return {
        ...state,
        lead: payload,
        loading: false
      };
    case ADD_LEAD:
    case UPDATE_LEAD:
      return {
        ...state,
        lead: payload,
        loading: false
      };
    case DELETE_LEAD:
      return {
        ...state,
        lead: null,
        loading: false
      };
    case SET_LEAD_LOADING:
      return {
        ...state,
        loading: true
      };
    case LEAD_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
}
