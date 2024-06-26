import * as types from '../type';
export interface NotificationState {
  error: string,
  isLoading: boolean,
  noti_history: any,
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  noti_history: null,
};

const notification = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.GET_SYSTEM_NOTI_HISTORY_REQUEST: // typeName 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_SYSTEM_NOTI_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        noti_history: action.payload,
      };
    case types.GET_SYSTEM_NOTI_HISTORY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.POST_SYSTEM_NOTI_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.POST_SYSTEM_NOTI_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.POST_SYSTEM_NOTI_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default notification;
