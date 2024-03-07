import * as types from '../type';
export interface ParcelState {
  error: string,
  isLoading: boolean,
  all_parcel: any,
  parcel_by_id: any,
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  all_parcel: null,
  parcel_by_id:null,
};

const parcel = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.GET_ALL_PARCEL_REQUEST: // typeName 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_PARCEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        all_parcel: action.payload,
      };
    case types.GET_ALL_PARCEL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_PARCEL_BY_ID_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_PARCEL_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        parcel_by_id: action.payload,
      };
    case types.GET_PARCEL_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default parcel;
