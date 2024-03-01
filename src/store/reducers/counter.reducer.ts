import * as types from '../type';
export interface CounterState {
  error: string,
  isLoading: boolean,
  all_counters: any,
  counter_by_id: any,
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  all_counters: null,
  counter_by_id:null,
};

const counter = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.GET_ALL_COUNTERS_REQUEST: // typeName 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_COUNTERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        all_counters: action.payload,
      };
    case types.GET_ALL_COUNTERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_COUNTER_BY_ID_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_COUNTER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        counter_by_id: action.payload,
      };
    case types.GET_COUNTER_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default counter;
