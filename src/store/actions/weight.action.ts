
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';
import { routeFilter } from '../../utils';

const createWeight = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_WEIGHT_REQUEST));
  return await controller(apiRoutes.create_weight)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_WEIGHT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_WEIGHT_ERROR, error.message)));
};

const getAllWeight = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_WEIGHT_REQUEST));
  return await controller(apiRoutes.all_weight)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_WEIGHT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_WEIGHT_ERROR, error.message)));
};


const getAllWeightByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_WEIGHT_REQUEST));
  return await controller(`${apiRoutes.all_weight}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_WEIGHT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_WEIGHT_ERROR, error.message)));
};

const getWeightById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_WEIGHT_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_weight}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_WEIGHT_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_WEIGHT_BY_ID_ERROR, error.message)));
};

const updateWeight = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_WEIGHT_REQUEST));
  return await controller(`${apiRoutes.update_weight}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_WEIGHT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_WEIGHT_ERROR, error.message)));
};

const deleteWeight = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_WEIGHT_REQUEST));
  return await controller(`${apiRoutes.delete_weight}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_WEIGHT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_WEIGHT_ERROR, error.message)));
};

export const weight = {
  createWeight,
  getAllWeight,
  getAllWeightByFilter,
  getWeightById,
  updateWeight,
  deleteWeight
};