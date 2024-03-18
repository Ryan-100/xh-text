import * as types from "../type";
export interface ModuleState {
  error: string;
  isLoading: boolean;
  all_module: any;
}

export type Action = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  all_module: null,
};

const module = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.GET_ALL_MODULE_REQUEST: // typeName
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_MODULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        all_module: action.payload,
      };
    case types.GET_ALL_MODULE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default module;
