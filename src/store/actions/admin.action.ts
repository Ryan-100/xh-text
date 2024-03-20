/* eslint-disable */
import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";

export interface CreateAdminData {
	phone: string;
	username: string;
	password?: string;
	role_id: string;
	city_id: string;
	address_city_id: string;
	address_block_id: string;
	address_region_id: string;
	address: string;
	counter_id: string;
	profile_image_url?: string;
	active: number;
}

export interface UpdateAdminData extends CreateAdminData {}

const getAllAdmins =
	(role_id?: string, counter_id?: string) => async (dispatch: Dispatch) => {
		dispatch(FetchRequest(types.GET_ALL_ADMINS_REQUEST));
		let apiUrl = apiRoutes.all_admin;
		const params = new URLSearchParams();
		if (role_id) {
			params.append("role_id", role_id);
		}
		if (counter_id) {
			params.append("counter_id", counter_id);
		}
		if (params.toString()) {
			apiUrl += `?${params.toString()}`;
		}
		return await controller(apiUrl)
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

// Adjusting the action creator to use query parameters
const getAdminById = (id: string) => async (dispatch: Dispatch) => {
	dispatch(FetchRequest(types.GET_ADMIN_BY_ID_REQUEST));
	return await controller(`${apiRoutes.get_admin}?counter_id=${id}`) // Using a query parameter
	  .then((res) => {
		if (res?.error) {
		  console.log(res.data);
		} else {
		  dispatch(FetchSuccess(types.GET_ADMIN_BY_ID_SUCCESS, res?.data));
		  return res?.data;
		}
	  })
	  .catch((error) =>
		dispatch(FetchFailure(types.GET_ADMIN_BY_ID_ERROR, error.message))
	  );
  };
  

const createAdmin = (data: CreateAdminData) => async (dispatch: Dispatch) => {
	dispatch(FetchRequest(types.CREATE_ADMIN_REQUEST));
	return await controller(apiRoutes.create_admin, data)
		.then((res) => {
			if (res?.error) {
				console.log(res.data);
			} else {
				dispatch(FetchSuccess(types.CREATE_ADMIN_SUCCESS, res?.data));
				return res?.data;
			}
		})
		.catch((error) => {
			dispatch(FetchFailure(types.CREATE_ADMIN_ERROR, error.message));
			return Promise.reject(error.message);
		});
};

const updateAdmin =
	(data: UpdateAdminData, id: string) => async (dispatch: Dispatch) => {
		dispatch(FetchRequest(types.UPDATE_ADMIN_REQUEST));
		return await controller(`${apiRoutes.update_admin}/${id}`, data)
			.then((res) => {
				if (res?.error) {
					console.log(res.data);
				} else {
					dispatch(FetchSuccess(types.UPDATE_ADMIN_SUCCESS, res?.data));
					return res?.data;
				}
			})
			.catch((error) => {
				dispatch(FetchFailure(types.UPDATE_ADMIN_ERROR, error.message));
				return Promise.reject(error.message);
			});
	};

const deleteAdmin = (id: string) => async (dispatch: Dispatch) => {
	dispatch(FetchRequest(types.DELETE_ADMIN_REQUEST));
	return await controller(`${apiRoutes.delete_admin}/${id}`)
		.then((res) => {
			if (res?.error) {
				console.log(res.data);
			} else {
				dispatch(FetchSuccess(types.DELETE_ADMIN_SUCCESS, res?.data));
				return res?.data;
			}
		})
		.catch((error) => {
			dispatch(FetchFailure(types.DELETE_ADMIN_ERROR, error.message));
			return Promise.reject(error.message);
		});
};

export const admin = {
	getAllAdmins,
	getAdminById,
	createAdmin,
	updateAdmin,
	deleteAdmin,
};
