// emit.reducer.ts
export interface EmitState {
  page: string; // Adjust the type based on your actual state structure
}

export type EmitAction = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  page: 'Dashboard',
};

const emit = (state = initialState, action) => {
  switch (action.type) {
    case 'PAGE_NAME_CHANGE':
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default emit;
