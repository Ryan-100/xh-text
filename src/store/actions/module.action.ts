
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';

const getModules = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_MODULE_REQUEST));
  return await controller(`${apiRoutes.get_module}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_MODULE_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_MODULE_ERROR, error.message)));
};

export const module = {
  getModules,
};