/* eslint-disable */

import * as types from "../type";
export interface HelpCenterState {
  error: string;
  isLoading: boolean;
  all_help_center: any;
  help_center_by_id: any;
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  all_help_center: null,
  help_center_by_id: null,
};

const help = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.GET_ALL_HELP_CENTER_REQUEST: // typeName
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_HELP_CENTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        all_help_center: action.payload,
      };
    case types.GET_ALL_HELP_CENTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_HELP_CENTER_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_HELP_CENTER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        help_center_by_id: action.payload,
      };
    case types.GET_HELP_CENTER_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default help;
