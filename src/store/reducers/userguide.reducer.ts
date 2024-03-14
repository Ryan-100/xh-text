import * as types from '../type';
export interface UserGuideState {
  error: string,
  isLoading: boolean,
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
};

const userguide = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.SEND_USER_GUIDE_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.SEND_USER_GUIDE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.SEND_USER_GUIDE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userguide;
