import * as types from '../type';
export interface amountState {
  error: string,
  isLoading: boolean,
  all_amounts: any,
  amount_by_id: any,
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  all_amounts: null,
  amount_by_id:null,
};

const amount = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.GET_ALL_AMOUNTS_REQUEST: // typeName 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_AMOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        all_amounts: action.payload,
      };
    case types.GET_ALL_AMOUNTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_AMOUNT_BY_ID_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_AMOUNT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        amount_by_id: action.payload,
      };
    case types.GET_AMOUNT_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default amount;
