import { combineReducers } from "redux";
import emit, { EmitState } from "./emit.reducer";
import auth, { AuthState } from "./auth.reducer";
import counter, { CounterState } from "./counter.reducer";
import notification, { NotificationState } from "./notification.reducer";
import version, { VersionState } from "./version.reducer";
import admin, { AdminState } from "./admin.reducer";
import role, { RoleState } from "./role.reducer";
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
	admin: AdminState;
	role: RoleState;
	version: VersionState;
}
export type RootAction = ActionType;

export default combineReducers({
	emit,
	auth,
	counter,
	notification,
	version,
	admin,
	role,
});
