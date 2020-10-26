import {
  GET_COMPANIES,
  ADD_COMPANY,
  COMPANY_ERROR,
  SET_COMPANY_LOADING
} from '../actions/types';

const initialState = {
  companies: [],
  company: null,
  loading: false,
  errors: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANIES:
      return {
        ...state,
        companies: payload,
        loading: false
      };
    case ADD_COMPANY:
      return {
        ...state,
        company: payload,
        loading: false
      };
    case COMPANY_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case SET_COMPANY_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
