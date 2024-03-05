/* eslint-disable */
import * as types from "../type";

export interface Admin {
	id: string;
	google_map_url: string | null;
	username: string;
	password: string;
	phone: string;
	adminID: string | null;
	city_id: string | null;
	counter_id: string | null;
	role_id: string;
	address_city_id: string | null;
	address_block_id: string | null;
	address_region_id: string | null;
	address: string | null;
	active: number;
	refresh_token: string | null;
	created_at: string;
	updated_at: string;
	role: {
		name: string;
	};
	city: {
		city_cha: string;
		city_eng: string;
		city_mm: string;
	} | null;
}


export interface AdminState {
	error: string;
	isLoading: boolean;
	all_admins: Admin;
	admin_by_id: any;
}

export type Action = {
	type: string;
	payload: any; // Adjust the type based on your actual actions
};

const initialState = {
	error: null,
	isLoading: false,
	all_admins: null,
	admin_by_id: null,
};

const admin = (state = initialState, action: Action) => {
	switch (action.type) {
		case types.GET_ALL_ADMINS_REQUEST: // typeName
			return {
				...state,
				isLoading: true,
			};
		case types.GET_ALL_ADMINS_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				all_admins: action.payload,
			};
		case types.GET_ALL_ADMINS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default admin;
