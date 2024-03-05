import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";

const getAllAdmins =
	() =>
	async (dispatch: Dispatch) => {
		dispatch(FetchRequest(types.GET_ALL_ADMINS_REQUEST));
		return await controller(apiRoutes.all_admin)
			.then((res) => {
				if (res?.error) {
					console.log(res.data);
				} else {
					dispatch(FetchSuccess(types.GET_ALL_ADMINS_SUCCESS, res?.data));
					return res?.data;
				}
			})
			.catch((error) =>
				dispatch(FetchFailure(types.GET_ALL_ADMINS_ERROR, error.message))
			);
	};

export const admin = {
	getAllAdmins,
};
