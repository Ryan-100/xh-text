
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';
import { routeFilter } from '../../utils';

export type PaymentTypeInterface = {
  name: string;
  icon_url: string;
  receive_qr_url: string;
  city_id: string;
  created_by:string;
};


const createPaymentType = (data:PaymentTypeInterface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_PAYMENT_REQUEST));
  return await controller(apiRoutes.create_payment,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_PAYMENT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_PAYMENT_ERROR, error.message)));
};

const getAllPaymentTypes = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_PAYMENT_REQUEST));
  return await controller(apiRoutes.all_payment)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_PAYMENT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_PAYMENT_ERROR, error.message)));
};


const getAllPaymentTypesByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_PAYMENT_REQUEST));
  return await controller(`${apiRoutes.all_payment}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_PAYMENT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_PAYMENT_ERROR, error.message)));
};

const getPaymentTypeById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_PAYMENT_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_payment}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_PAYMENT_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_PAYMENT_BY_ID_ERROR, error.message)));
};

const updatePaymentType = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_PAYMENT_REQUEST));
  return await controller(`${apiRoutes.update_payment}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_PAYMENT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_PAYMENT_ERROR, error.message)));
};

const deletePaymentType = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_PAYMENT_REQUEST));
  return await controller(`${apiRoutes.delete_payment}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_PAYMENT_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_PAYMENT_ERROR, error.message)));
};

export const payment = {
  createPaymentType,
  getAllPaymentTypes,
  getAllPaymentTypesByFilter,
  getPaymentTypeById,
  updatePaymentType,
  deletePaymentType
};