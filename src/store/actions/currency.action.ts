
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';
import { routeFilter } from '../../utils';
export interface CurrencyDataInterface {
  name:string;
  active:number;
}

const createCurrency = (data:CurrencyDataInterface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_CURRENCY_REQUEST));
  return await controller(apiRoutes.create_currency,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_CURRENCY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_CURRENCY_ERROR, error.message)));
};

const getAllCurrency = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_CURRENCY_REQUEST));
  return await controller(apiRoutes.all_currency)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_CURRENCY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_CURRENCY_ERROR, error.message)));
};


const getAllCurrencyByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_CURRENCY_REQUEST));
  return await controller(`${apiRoutes.all_currency}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_CURRENCY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_CURRENCY_ERROR, error.message)));
};

const getCurrencyById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_CURRENCY_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_currency}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_CURRENCY_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_CURRENCY_BY_ID_ERROR, error.message)));
};

const updateCurrency = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_CURRENCY_REQUEST));
  return await controller(`${apiRoutes.update_currency}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_CURRENCY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_CURRENCY_ERROR, error.message)));
};

const deleteCurrency = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_CURRENCY_REQUEST));
  return await controller(`${apiRoutes.delete_currency}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_CURRENCY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_CURRENCY_ERROR, error.message)));
};

export const currency = {
  createCurrency,
  getAllCurrency,
  getAllCurrencyByFilter,
  getCurrencyById,
  updateCurrency,
  deleteCurrency
};