import * as types from '../type';
export interface AuthState {
  error: string,
  isLoading: boolean,
  auth_data: any,
}

export type AuthAction = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  auth_data: null,
};

const auth = (state = initialState, action:AuthAction) => {
  switch (action.type) {
    case types.POST_LOGIN_REQUEST: // typeName //*for Sign in
      return {
        ...state,
        isLoading: true,
      };
    case types.POST_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        auth_data: action.payload,
      };
    case types.POST_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_ADMIN_BY_ID_REQUEST: // typeName //*for Sign in
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ADMIN_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case types.GET_ADMIN_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
