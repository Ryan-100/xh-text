/* eslint-disable */

import * as types from "../type";
export interface RoleState {
	error: string;
	isLoading: boolean;
	all_roles: any;
	role_by_id: any;
}

export type Action = {
	type: string;
	payload: any; // Adjust the type based on your actual actions
};

const initialState = {
	error: null,
	isLoading: false,
	all_roles: null,
	role_by_id: null,
};

const role = (state = initialState, action: Action) => {
	switch (action.type) {
		case types.GET_ALL_ROLES_REQUEST: // typeName
			return {
				...state,
				isLoading: true,
			};
		case types.GET_ALL_ROLES_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				all_roles: action.payload,
			};
		case types.GET_ALL_ROLES_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default role;
