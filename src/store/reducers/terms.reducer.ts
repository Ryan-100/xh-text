import * as types from '../type';
export interface TermsAndPolicyState {
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

const terms = (state = initialState, action:Action) => {
  switch (action.type) {
    case types.SEND_TERMS_AND_POLICY_REQUEST:  
      return {
        ...state,
        isLoading: true,
      };
    case types.SEND_TERMS_AND_POLICY_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.SEND_TERMS_AND_POLICY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default terms;
