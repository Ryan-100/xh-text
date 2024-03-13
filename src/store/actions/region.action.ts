import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";
import { routeFilter } from "../../utils";
export interface RegionDataInterface {
	region_mm: string;
  region_eng: string;
  region_cha: string;
  block_id: string;
  prefix: string;
  active: number;
	created_by:string;
}

const createRegion = (data:RegionDataInterface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_REGION_REQUEST));
  return await controller(apiRoutes.create_region,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_REGION_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_REGION_ERROR, error.message)));
};

const getAllRegions = () => async (dispatch: Dispatch) => {
	dispatch(FetchRequest(types.GET_ALL_REGIONS_REQUEST));
	return await controller(apiRoutes.all_region)
		.then((res) => {
			if (res?.error) {
				console.log(res.data);
			} else {
				dispatch(FetchSuccess(types.GET_ALL_REGIONS_SUCCESS, res?.data));
				return res?.data;
			}
		})
		.catch((error) =>
			dispatch(FetchFailure(types.GET_ALL_REGIONS_ERROR, error.message))
		);
};

const getAllRegionsByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_REGION_REQUEST));
  return await controller(`${apiRoutes.all_region}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_REGION_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_REGION_ERROR, error.message)));
};

const getRegionById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_REGION_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_region}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_REGION_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_REGION_BY_ID_ERROR, error.message)));
};

const updateRegion = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_REGION_REQUEST));
  return await controller(`${apiRoutes.update_region}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_REGION_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_REGION_ERROR, error.message)));
};

const deleteRegion = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_REGION_REQUEST));
  return await controller(`${apiRoutes.delete_region}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_REGION_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_REGION_ERROR, error.message)));
};

export const region = {
	createRegion,
	getAllRegions,
	getAllRegionsByFilter,
  getRegionById,
  updateRegion,
  deleteRegion
};
