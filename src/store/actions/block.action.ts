import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";

const getAllBlock = () => async (dispatch: Dispatch) => {
	dispatch(FetchRequest(types.GET_ALL_BLOCK_REQUEST));
	return await controller(apiRoutes.all_block)
		.then((res) => {
			if (res?.error) {
				console.log(res.data);
			} else {
				dispatch(FetchSuccess(types.GET_ALL_BLOCK_SUCCESS, res?.data));
				return res?.data;
			}
		})
		.catch((error) =>
			dispatch(FetchFailure(types.GET_ALL_BLOCK_ERROR, error.message))
		);
};

export const block = {
	getAllBlock,
};
