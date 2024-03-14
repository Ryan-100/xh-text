import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";
import { routeFilter } from "../../utils";

export interface HelpCenterInterface {
	block_mm: string;
  block_eng: string;
  block_cha: string;
  city_id: string;
  prefix: string;
  active: number;
	created_by:string;
}

const createHelpCenter = (data:HelpCenterInterface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_HELP_CENTER_REQUEST));
  return await controller(apiRoutes.create_help_center,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_HELP_CENTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_HELP_CENTER_ERROR, error.message)));
};

const getHelpCenters = () => async (dispatch: Dispatch) => {
	dispatch(FetchRequest(types.GET_ALL_HELP_CENTER_REQUEST));
	return await controller(apiRoutes.all_help_center)
		.then((res) => {
			if (res?.error) {
				console.log(res.data);
			} else {
				dispatch(FetchSuccess(types.GET_ALL_HELP_CENTER_SUCCESS, res?.data));
				return res?.data;
			}
		})
		.catch((error) =>
			dispatch(FetchFailure(types.GET_ALL_HELP_CENTER_ERROR, error.message))
		);
};

const getHelpCentersByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_HELP_CENTER_REQUEST));
  return await controller(`${apiRoutes.all_help_center}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_HELP_CENTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_HELP_CENTER_ERROR, error.message)));
};

const getHelpCenterById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_HELP_CENTER_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_help_center}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_HELP_CENTER_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_HELP_CENTER_BY_ID_ERROR, error.message)));
};

const updateHelpCenter = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_HELP_CENTER_REQUEST));
  return await controller(`${apiRoutes.update_help_center}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_HELP_CENTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_HELP_CENTER_ERROR, error.message)));
};

const deleteCenter = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_HELP_CENTER_REQUEST));
  return await controller(`${apiRoutes.delete_help_center}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_HELP_CENTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_HELP_CENTER_ERROR, error.message)));
};

export const help = {
	createHelpCenter,
	getHelpCenters,
	getHelpCentersByFilter,
  getHelpCenterById,
  updateHelpCenter,
  deleteCenter
};
