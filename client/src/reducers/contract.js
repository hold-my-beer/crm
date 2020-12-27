import {
  GET_CONTRACTS,
  GET_NEAREST_CONTRACTS,
  GET_CONTRACT,
  ADD_CONTRACTS,
  UPDATE_CONTRACT,
  DELETE_CONTRACT,
  CONTRACT_ERROR,
  SET_CONTRACT_LOADING
} from '../actions/types';

const initialState = {
  contracts: [],
  contract: null,
  newContracts: [],
  errors: [],
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTRACTS:
    case GET_NEAREST_CONTRACTS:
      return {
        ...state,
        contracts: payload,
        loading: false
      };
    case GET_CONTRACT:
    case UPDATE_CONTRACT:
      return {
        ...state,
        contract: payload,
        loading: false
      };
    case ADD_CONTRACTS:
      return {
        ...state,
        newContracts: payload,
        loading: false
      };
    case DELETE_CONTRACT:
      return {
        ...state,
        contract: null,
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
