/* eslint-disable */

import * as types from "../type";
export interface RegionState {
	error: string;
	isLoading: boolean;
	all_regions: any;
	region_by_id: any;
}

export type Action = {
	type: string;
	payload: any; // Adjust the type based on your actual actions
};

const initialState = {
	error: null,
	isLoading: false,
	all_regions: null,
	region_by_id: null,
};

const region = (state = initialState, action: Action) => {
	switch (action.type) {
		case types.GET_ALL_REGIONS_REQUEST: // typeName
			return {
				...state,
				isLoading: true,
			};
		case types.GET_ALL_REGIONS_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				all_regions: action.payload,
			};
		case types.GET_ALL_REGIONS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case types.GET_REGION_BY_ID_REQUEST: // typeName
			return {
				...state,
				isLoading: true,
			};
		case types.GET_REGION_BY_ID_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				region_by_id: action.payload,
			};
		case types.GET_REGION_BY_ID_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default region;
