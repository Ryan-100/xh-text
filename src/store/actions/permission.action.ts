
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';
import { routeFilter } from '../../utils';

export interface PermissionInterface{
  city_id: string;
  counter_id: string;
  role_id: string;
  created_by: string;
  roleItem: {
    module_id: number;
    role_id: string;
    is_access: number;
  }[];
}

const createPermission = (data:PermissionInterface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_ROLE_ITEM_REQUEST));
  return await controller(apiRoutes.create_permission,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_ROLE_ITEM_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_ROLE_ITEM_ERROR, error.message)));
};

const getAllPermission = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_ROLE_ITEM_REQUEST));
  return await controller(apiRoutes.all_permission)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_ROLE_ITEM_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_ROLE_ITEM_ERROR, error.message)));
};


const getAllPermissionByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_ROLE_ITEM_FILTER_REQUEST));
  return await controller(`${apiRoutes.all_permission}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_ROLE_ITEM_FILTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_ROLE_ITEM_FILTER_ERROR, error.message)));
};

const getPermissionById = (params:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ROLE_ITEM_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_permission}?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ROLE_ITEM_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ROLE_ITEM_BY_ID_ERROR, error.message)));
};

const updatePermission = (data:PermissionInterface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_ROLE_ITEM_REQUEST));
  return await controller(`${apiRoutes.update_permission}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_ROLE_ITEM_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_ROLE_ITEM_ERROR, error.message)));
};

const deletePermission = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_ROLE_ITEM_REQUEST));
  return await controller(`${apiRoutes.delete_permission}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_ROLE_ITEM_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_ROLE_ITEM_ERROR, error.message)));
};

export const permission = {
  createPermission,
  getAllPermission,
  getAllPermissionByFilter,
  getPermissionById,
  updatePermission,
  deletePermission
};
