import * as types from '../type';
export interface WeightState {
  error: string,
  isLoading: boolean,
  all_weight: any,
  weight_by_id: any,
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  all_weight: null,
  weight_by_id:null,
};

const weight = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.GET_ALL_WEIGHT_REQUEST: // typeName 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_WEIGHT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        all_weight: action.payload,
      };
    case types.GET_ALL_WEIGHT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_WEIGHT_BY_ID_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_WEIGHT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        weight_by_id: action.payload,
      };
    case types.GET_WEIGHT_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default weight;
