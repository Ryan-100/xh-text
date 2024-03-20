// emit.reducer.ts
export interface EmitState {
  page: string; // Adjust the type based on your actual state structure
  drawer_open:boolean;
}

export type EmitAction = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  page: 'Dashboard',
  drawer_open:true,
};

const emit = (state = initialState, action:EmitAction) => {
  switch (action.type) {
    case 'PAGE_NAME_CHANGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'DRAWER_HANDLER':
      return {
        ...state,
        drawer_open: action.payload,
      };
    default:
      return state;
  }
};

export default emit;
