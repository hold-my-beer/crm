import {
  GET_BROKERS,
  ADD_BROKER,
  BROKER_ERROR,
  SET_BROKER_LOADING
} from '../actions/types';

const initialState = {
  brokers: [],
  broker: null,
  loading: false,
  errors: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BROKERS:
      return {
        ...state,
        brokers: payload,
        loading: false
      };
    case ADD_BROKER:
      return {
        ...state,
        broker: payload,
        loading: false
      };
    case BROKER_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case SET_BROKER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
