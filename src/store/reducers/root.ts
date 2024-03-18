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
import payment, { PaymentState } from "./payment.reducer";
import userguide, { UserGuideState } from "./userguide.reducer";
import terms, { TermsAndPolicyState } from "./terms.reducer";
import help, { HelpCenterState } from "./help.reducer";
import permission, { PermissionState } from "./permission.reducer";
import module, { ModuleState } from "./module.reducer";
import banner, { BannerState } from "./banner.reducer";

type ActionType = {
	type: string;
	payload: any; // Adjust the type based on your actual actions
};
export interface RootState {
	emit: EmitState;
	auth: AuthState;
	image:ImageState;
	permission:PermissionState;
	module:ModuleState;
	counter: CounterState;
	notification: NotificationState;
	admin: AdminState;
	role: RoleState;
	version: VersionState;
	city: CityState;
	userguide: UserGuideState;
	terms:TermsAndPolicyState;
	payment: PaymentState;
	block: BlockState;
	region: RegionState;
	currency: CurrencyState;
	weight: WeightState;
	banner: BannerState;
	help:HelpCenterState;
	parcel: ParcelState;
	report: ReportState;
}
export type RootAction = ActionType;

export default combineReducers({
	emit,
	auth,
	image,
	counter,
	permission,
	module,
	notification,
	version,
	city,
	userguide,
	terms,
	payment,
	help,
	block,
	region,
	admin,
	role,
	currency,
	banner,
	weight,
	parcel,
	report,
});
