/* eslint-disable */

import * as types from "../type";
export interface ReportState {
	error: string;
	isLoading: boolean;
	all_regions: any;
	region_by_id: any;
}

export type Action = {
	type: string;
	payload: any; // Adjust the type based on your actual actions
	error: any;
};

const initialState = {
	error: null,
	isLoading: false,
	report: null,
};

const report = (state = initialState, action: Action) => {
	switch (action.type) {
		case types.GET_ALL_REPORTS_REQUEST: // typeName
			return {
				...state,
				isLoading: true,
			};
		case types.GET_ALL_REPORTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				report: action.payload,
			};
		case types.GET_ALL_REPORTS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};
		default:
			return state;
	}
};

export default report;
