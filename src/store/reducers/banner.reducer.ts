import * as types from '../type';
export interface BannerState {
  error: string,
  isLoading: boolean,
  all_banners: any,
  all_app_banners: any,
  all_app_just_banners: any,
  banner_by_id: any,
  app_banner_by_id: any,
  app_just_banner_by_id: any,
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  all_banners: null,
  all_app_banners: null,
  all_app_just_banners: null,
  banner_by_id:null,
  app_banner_by_id:null,
  app_just_banner_by_id:null,
};

const banner = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.GET_ALL_BANNER_REQUEST: //* Banner 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_BANNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        all_banners: action.payload,
      };
    case types.GET_ALL_BANNER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_BANNER_BY_ID_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_BANNER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        banner_by_id: action.payload,
      };
    case types.GET_BANNER_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case types.GET_ALL_APP_BANNER_REQUEST: //* App Banner 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_APP_BANNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        all_app_banners: action.payload,
      };
    case types.GET_ALL_APP_BANNER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_APP_BANNER_BY_ID_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_APP_BANNER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        app_banner_by_id: action.payload,
      };
    case types.GET_APP_BANNER_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case types.GET_ALL_JUST_BANNER_REQUEST: //* App Just Banner 
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_JUST_BANNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        all_app_just_banners: action.payload,
      };
    case types.GET_ALL_JUST_BANNER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_JUST_BANNER_BY_ID_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_JUST_BANNER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        app_jsut_banner_by_id: action.payload,
      };
    case types.GET_JUST_BANNER_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default banner;
