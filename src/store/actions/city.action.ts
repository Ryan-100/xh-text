import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";

const getAllcities = () => async (dispatch: Dispatch) => {
	dispatch(FetchRequest(types.GET_ALL_CITIES_REQUEST));
	return await controller(apiRoutes.all_city)
		.then((res) => {
			if (res?.error) {
				console.log(res.data);
			} else {
				dispatch(FetchSuccess(types.GET_ALL_CITIES_SUCCESS, res?.data));
				return res?.data;
			}
		})
		.catch((error) =>
			dispatch(FetchFailure(types.GET_ALL_CITIES_ERROR, error.message))
		);
};

export const city = {
	getAllcities,
};
