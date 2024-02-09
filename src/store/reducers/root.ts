import { combineReducers } from 'redux';
import emit, { EmitAction, EmitState } from './emit.reducer';
// Define RootState
export interface RootState {
  // Add other reducer states as needed
  emit:EmitState
}
export type RootAction = EmitAction 

export default combineReducers({
  emit,
});
