
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';
import { routeFilter } from '../../utils';

export interface CityDataInterface{
  city_mm: string;
  city_eng: string;
  city_cha: string;
  currency_id: string;
  prefix: string;
  active: number;
}

const createCity = (data:CityDataInterface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_CITY_REQUEST));
  return await controller(apiRoutes.create_city,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_CITY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_CITY_ERROR, error.message)));
};

const getAllCities = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_CITY_REQUEST));
  return await controller(apiRoutes.all_city)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_CITY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_CITY_ERROR, error.message)));
};


const getAllCitiesByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_CITY_FILTER_REQUEST));
  return await controller(`${apiRoutes.all_city}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_CITY_FILTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_CITY_FILTER_ERROR, error.message)));
};

const getCityById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_CITY_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_city}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_CITY_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_CITY_BY_ID_ERROR, error.message)));
};

const updateCity = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_CITY_REQUEST));
  return await controller(`${apiRoutes.update_city}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_CITY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_CITY_ERROR, error.message)));
};

const deleteCity = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_CITY_REQUEST));
  return await controller(`${apiRoutes.delete_city}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_CITY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_CITY_ERROR, error.message)));
};

export const city = {
  createCity,
  getAllCities,
  getAllCitiesByFilter,
  getCityById,
  updateCity,
  deleteCity
};
