import * as types from '../type';
export interface PaymentState {
  error: string,
  isLoading: boolean,
  all_payments: any,
  payment_by_id: any,
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  all_payments: null,
  payment_by_id:null,
};

const payment = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.GET_ALL_PAYMENT_REQUEST: // typeName 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        all_payments: action.payload,
      };
    case types.GET_ALL_PAYMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_PAYMENT_BY_ID_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_PAYMENT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        payment_by_id: action.payload,
      };
    case types.GET_PAYMENT_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default payment;
