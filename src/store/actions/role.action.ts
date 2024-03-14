import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";
import { routeFilter } from "../../utils";

export interface RoleDataInterface {
  name: string;
  city_id: string;
  counter_id: string;
  description: string;
  // created_by: string;
}

const createRole = (data: RoleDataInterface) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.CREATE_ROLE_REQUEST));
  return await controller(apiRoutes.create_role, data)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_ROLE_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.CREATE_ROLE_ERROR, error.message))
    );
};

const getAllRoles = () => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_ROLES_REQUEST));
  return await controller(apiRoutes.all_role)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_ROLES_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.GET_ALL_ROLES_ERROR, error.message))
    );
};

const getAllRolesByFilter = (params) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_ROLE_FILTER_REQUEST));
  return await controller(`${apiRoutes.all_role}/pages?${routeFilter(params)}`)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_ROLE_FILTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.GET_ALL_ROLE_FILTER_ERROR, error.message))
    );
};

const getRoleById = (id: string) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.GET_ROLE_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_role}/${id}`)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ROLE_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.GET_ROLE_BY_ID_ERROR, error.message))
    );
};

const updateRole = (id: string, data: any) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_ROLE_REQUEST));
  return await controller(`${apiRoutes.update_role}/${id}`, data)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_ROLE_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.UPDATE_ROLE_ERROR, error.message))
    );
};

const deleteRole = (id: string) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.DELETE_ROLE_REQUEST));
  return await controller(`${apiRoutes.delete_role}/${id}`, id)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_ROLE_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.DELETE_ROLE_ERROR, error.message))
    );
};

export const role = {
  createRole,
  getAllRoles,
  getAllRolesByFilter,
  getRoleById,
  updateRole,
  deleteRole,
};
