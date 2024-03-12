import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";

const getReport =
	(from_date?: string, to_date?: string) => async (dispatch: Dispatch) => {
		let queryParams = "";

		if (from_date && to_date) {
			queryParams = `?from_date=${encodeURIComponent(
				from_date
			)}&to_date=${encodeURIComponent(to_date)}`;
		}

		const url = `${apiRoutes.get_report}${queryParams}`;

		dispatch(FetchRequest(types.GET_ALL_REPORTS_REQUEST));
		return await controller(url)
			.then((res) => {
				if (res?.error) {
					console.log(res.data);
				} else {
					dispatch(FetchSuccess(types.GET_ALL_REPORTS_SUCCESS, res?.data));
					return res?.data;
				}
			})
			.catch((error) =>
				dispatch(FetchFailure(types.GET_ALL_REPORTS_ERROR, error.message))
			);
	};

export const report = {
	getReport,
};
