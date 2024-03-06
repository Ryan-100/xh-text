/* eslint-disable */

import * as types from "../type";
export interface BlockState {
	error: string;
	isLoading: boolean;
	all_blocks: any;
	block_by_id: any;
}

export type Action = {
	type: string;
	payload: any; // Adjust the type based on your actual actions
};

const initialState = {
	error: null,
	isLoading: false,
	all_blocks: null,
	block_by_id: null,
};

const block = (state = initialState, action: Action) => {
	switch (action.type) {
		case types.GET_ALL_BLOCKS_REQUEST: // typeName
			return {
				...state,
				isLoading: true,
			};
		case types.GET_ALL_BLOCKS_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				all_blocks: action.payload,
			};
		case types.GET_ALL_BLOCKS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default block;
