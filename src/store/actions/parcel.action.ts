
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';
import { routeFilter } from '../../utils';

export interface ParcelTypeInterface{
  parcel_type:string;
  state:number
}

const createParcel = (data:ParcelTypeInterface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_PARCEL_REQUEST));
  return await controller(apiRoutes.create_parcel,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_PARCEL_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_PARCEL_ERROR, error.message)));
};

const getAllParcel = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_PARCEL_REQUEST));
  return await controller(apiRoutes.all_parcel)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_PARCEL_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_PARCEL_ERROR, error.message)));
};


const getAllParcelByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_PARCEL_FILTER_REQUEST));
  return await controller(`${apiRoutes.all_parcel}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_PARCEL_FILTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_PARCEL_FILTER_ERROR, error.message)));
};

const getParcelById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_PARCEL_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_parcel}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_PARCEL_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_PARCEL_BY_ID_ERROR, error.message)));
};

const updateParcel = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_PARCEL_REQUEST));
  return await controller(`${apiRoutes.update_parcel}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_PARCEL_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_PARCEL_ERROR, error.message)));
};

const deleteParcel = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_PARCEL_REQUEST));
  return await controller(`${apiRoutes.delete_parcel}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_PARCEL_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_PARCEL_ERROR, error.message)));
};

export const parcel = {
  createParcel,
  getAllParcel,
  getAllParcelByFilter,
  getParcelById,
  updateParcel,
  deleteParcel
};
