import {
  GET_ACTIVITY_TYPES,
  ACTIVITY_TYPE_ERROR,
  SET_ACTIVITY_TYPE_LOADING
} from '../actions/types';

const initialState = {
  activityTypes: [],
  errors: [],
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ACTIVITY_TYPES:
      return {
        ...state,
        activityTypes: payload,
        loading: false
      };
    case ACTIVITY_TYPE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case SET_ACTIVITY_TYPE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
