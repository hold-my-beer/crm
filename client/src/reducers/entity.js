import {
  GET_ENTITIES,
  ENTITY_ERROR,
  SET_ENTITY_LOADING
} from '../actions/types';

const initialState = {
  entities: [],
  errors: [],
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ENTITIES:
      return {
        ...state,
        entities: payload,
        loading: false
      };
    case ENTITY_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case SET_ENTITY_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
