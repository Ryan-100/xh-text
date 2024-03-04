
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';

const createCounter = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_COUNTER_REQUEST));
  return await controller(apiRoutes.create_counter)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_COUNTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_COUNTER_ERROR, error.message)));
};

const getAllCounters = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_COUNTERS_REQUEST));
  return await controller(apiRoutes.all_counter)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_COUNTERS_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_COUNTERS_ERROR, error.message)));
};

const getCounterById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_COUNTER_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_counter}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_COUNTER_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_COUNTER_BY_ID_ERROR, error.message)));
};

const updateCounter = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_COUNTER_REQUEST));
  return await controller(`${apiRoutes.update_counter}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_COUNTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_COUNTER_ERROR, error.message)));
};

const deleteCounter = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_COUNTER_REQUEST));
  return await controller(`${apiRoutes.delete_counter}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_COUNTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_COUNTER_ERROR, error.message)));
};

export const counter = {
  createCounter,
  getAllCounters,
  getCounterById,
  updateCounter,
  deleteCounter
};