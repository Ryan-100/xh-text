
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';
import { routeFilter } from '../../utils';

export type AmountType = {
  parcel_type_id: string;
  weight_id: string;
  from_city_id: string;
  to_city_id: string;
  currency_id: string;
  delivery_fee: number;
  created_by:string;
};


const createAmount = (data:AmountType) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_AMOUNT_REQUEST));
  return await controller(apiRoutes.create_amount,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_AMOUNT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_AMOUNT_ERROR, error.message)));
};

const getAllAmounts = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_AMOUNTS_REQUEST));
  return await controller(apiRoutes.all_amount)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_AMOUNTS_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_AMOUNTS_ERROR, error.message)));
};


const getAllAmountsByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_AMOUNTS_REQUEST));
  return await controller(`${apiRoutes.all_amount}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_AMOUNTS_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_AMOUNTS_ERROR, error.message)));
};

const getAmountById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_AMOUNT_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_amount}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_AMOUNT_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_AMOUNT_BY_ID_ERROR, error.message)));
};

const updateAmount = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_AMOUNT_REQUEST));
  return await controller(`${apiRoutes.update_amount}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_AMOUNT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_AMOUNT_ERROR, error.message)));
};

const deleteAmount = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_AMOUNT_REQUEST));
  return await controller(`${apiRoutes.delete_amount}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_AMOUNT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_AMOUNT_ERROR, error.message)));
};

export const amount = {
  createAmount,
  getAllAmounts,
  getAllAmountsByFilter,
  getAmountById,
  updateAmount,
  deleteAmount
};