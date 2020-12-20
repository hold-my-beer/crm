import {
  GET_CONTRACTS,
  ADD_CONTRACTS,
  CONTRACT_ERROR,
  SET_CONTRACT_LOADING
} from '../actions/types';

const initialState = {
  contracts: [],
  newContracts: [],
  errors: [],
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTRACTS:
      return {
        ...state,
        contracts: payload,
        loading: false
      };
    case ADD_CONTRACTS:
      return {
        ...state,
        newContracts: payload,
        loading: false
      };
    case CONTRACT_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case SET_CONTRACT_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
