import { combineReducers } from "redux";
import emit, { EmitState } from "./emit.reducer";
import auth, { AuthState } from "./auth.reducer";
import counter, { CounterState } from "./counter.reducer";
import notification, { NotificationState } from "./notification.reducer";
import version, { VersionState } from "./version.reducer";
import city, { CityState } from "./city.reducer";
import admin, { AdminState } from "./admin.reducer";
import role, { RoleState } from "./role.reducer";
import currency, { CurrencyState } from "./currency.reducer";
import weight, { WeightState } from "./weight.reducer";
import parcel, { ParcelState } from "./parcel.reducer";
import report, { ReportState } from "./report.reducer";
import block, { BlockState } from "./block.reducer";
import region, { RegionState } from "./region.reducer";
import image, { ImageState } from "./image.reducer";

type ActionType = {
	type: string;
	payload: any; // Adjust the type based on your actual actions
};
export interface RootState {
	emit: EmitState;
	auth: AuthState;
	image:ImageState;
	counter: CounterState;
	notification: NotificationState;
	admin: AdminState;
	role: RoleState;
	version: VersionState;
	city: CityState;
	block: BlockState;
	region: RegionState;
	currency: CurrencyState;
	weight: WeightState;
	parcel: ParcelState;
	report: ReportState;
}
export type RootAction = ActionType;

export default combineReducers({
	emit,
	auth,
	image,
	counter,
	notification,
	version,
	city,
	block,
	region,
	admin,
	role,
	currency,
	weight,
	parcel,
	report,
});
