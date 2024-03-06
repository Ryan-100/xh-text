import { combineReducers } from "redux";
import emit, { EmitState } from "./emit.reducer";
import auth, { AuthState } from "./auth.reducer";
import counter, { CounterState } from "./counter.reducer";
import notification, { NotificationState } from "./notification.reducer";
import version, { VersionState } from "./version.reducer";
import city, { CityState } from "./city.reducer";
type ActionType = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};
export interface RootState {
  // Add other reducer states as needed
  emit: EmitState;
  auth: AuthState;
  counter: CounterState;
  notification: NotificationState;
  version: VersionState;
  city:CityState
}
export type RootAction = ActionType;

export default combineReducers({
  emit,
  auth,
  counter,
  notification,
  version,
  city
});
