import * as types from '../type';
export interface CurrencyState {
  error: string,
  isLoading: boolean,
  all_currency: any,
  currency_by_id: any,
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  all_currency: null,
  currency_by_id:null,
};

const currency = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.GET_ALL_CURRENCY_REQUEST: // typeName 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_CURRENCY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        all_currency: action.payload,
      };
    case types.GET_ALL_CURRENCY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_CURRENCY_BY_ID_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_CURRENCY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        currency_by_id: action.payload,
      };
    case types.GET_CURRENCY_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default currency;
