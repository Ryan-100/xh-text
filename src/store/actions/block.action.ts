import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";
import { routeFilter } from "../../utils";
export interface BlockDataInterface {
	block_mm: string;
  block_eng: string;
  block_cha: string;
  city_id: string;
  prefix: string;
  active: number;
	created_by:string;
}

const createBlock = (data:BlockDataInterface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_BLOCK_REQUEST));
  return await controller(apiRoutes.create_block,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_BLOCK_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_BLOCK_ERROR, error.message)));
};

const getAllblocks = () => async (dispatch: Dispatch) => {
	dispatch(FetchRequest(types.GET_ALL_BLOCKS_REQUEST));
	return await controller(apiRoutes.all_block)
		.then((res) => {
			if (res?.error) {
				console.log(res.data);
			} else {
				dispatch(FetchSuccess(types.GET_ALL_BLOCKS_SUCCESS, res?.data));
				return res?.data;
			}
		})
		.catch((error) =>
			dispatch(FetchFailure(types.GET_ALL_BLOCKS_ERROR, error.message))
		);
};

const getAllBlocksByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_BLOCK_REQUEST));
  return await controller(`${apiRoutes.all_block}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_BLOCK_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_BLOCK_ERROR, error.message)));
};

const getBlockById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_BLOCK_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_block}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_BLOCK_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_BLOCK_BY_ID_ERROR, error.message)));
};

const updateBlock = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_BLOCK_REQUEST));
  return await controller(`${apiRoutes.update_block}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_BLOCK_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_BLOCK_ERROR, error.message)));
};

const deleteBlock = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_BLOCK_REQUEST));
  return await controller(`${apiRoutes.delete_block}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_BLOCK_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_BLOCK_ERROR, error.message)));
};

export const block = {
	createBlock,
	getAllblocks,
	getAllBlocksByFilter,
  getBlockById,
  updateBlock,
  deleteBlock
};
