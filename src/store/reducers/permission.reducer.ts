import * as types from '../type';
export interface PermissionState {
  error: string,
  isLoading: boolean,
  all_permission: any,
  permission_by_id: any,
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  all_permission: null,
  permission_by_id:null,
};

const permission = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.GET_ALL_ROLE_ITEM_REQUEST: // typeName 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_ROLE_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        all_permission: action.payload,
      };
    case types.GET_ALL_ROLE_ITEM_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_ROLE_ITEM_BY_ID_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ROLE_ITEM_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        permission_by_id: action.payload,
      };
    case types.GET_ROLE_ITEM_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default permission;
