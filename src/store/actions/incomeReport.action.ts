/* eslint-disable */

import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";

const getDailyIncomeReport =
	({
		from_date,
		to_date,
		page,
		pageSize,
	}: {
		from_date: string;
		to_date: string;
		page: number;
		pageSize: number;
	}) =>
	async (dispatch: Dispatch) => {
		let queryParams = "";

		queryParams = `?from_date=${encodeURIComponent(
			from_date
		)}&to_date=${encodeURIComponent(to_date)}&skip=${page}&take=${pageSize}`;

		const url = `${apiRoutes.get_daily_income_report}${queryParams}`;
		dispatch(FetchRequest(types.GET_ALL_DAILY_INCOME_REPORT_REQUEST));
		return await controller(url)
			.then((res) => {
				if (res?.error) {
					console.log(res.data);
				} else {
					dispatch(
						FetchSuccess(types.GET_ALL_DAILY_INCOME_REPORT_SUCCESS, res?.data)
					);
					return res?.data;
				}
			})
			.catch((error) => {
				dispatch(
					FetchFailure(types.GET_ALL_DAILY_INCOME_REPORT_ERROR, error.message)
				);
				return Promise.reject(error.message);
			});
	};

export const incomeReport = {
	getDailyIncomeReport,
};
