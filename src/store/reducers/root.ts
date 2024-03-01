import { combineReducers } from 'redux';
import emit, { EmitAction, EmitState } from './emit.reducer';
import auth, {  AuthState } from './auth.reducer';
import counter, { CounterState } from './counter.reducer';
// Define RootState
export interface RootState {
  // Add other reducer states as needed
  emit:EmitState
  auth:AuthState
  counter:CounterState
}
export type RootAction = EmitAction  

export default combineReducers({
  emit,
  auth,
  counter
});
