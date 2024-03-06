/* eslint-disable */

import * as types from "../type";
export interface CityState {
	error: string;
	isLoading: boolean;
	all_cities: any;
	city_by_id: any;
}

export type Action = {
	type: string;
	payload: any; // Adjust the type based on your actual actions
};

const initialState = {
	error: null,
	isLoading: false,
	all_cities: null,
	city_by_id: null,
};

const city = (state = initialState, action: Action) => {
	switch (action.type) {
		case types.GET_ALL_CITIES_REQUEST: // typeName
			return {
				...state,
				isLoading: true,
			};
		case types.GET_ALL_CITIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				all_citys: action.payload,
			};
		case types.GET_ALL_CITIES_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default city;
