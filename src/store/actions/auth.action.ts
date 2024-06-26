
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';

interface LoginData {
  adminID: string;
  password: string;
}

//Sign In
const login = (data: LoginData) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.POST_LOGIN_REQUEST));
  return await controller(apiRoutes.login, data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.POST_LOGIN_SUCCESS, res?.data?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.POST_LOGIN_ERROR, error.message)));
};

//Admin user by id
const getAdminUserById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ADMIN_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_admin}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ADMIN_BY_ID_SUCCESS, res?.data?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ADMIN_BY_ID_ERROR, error.message)));
};

export const auth = {
  login,
  getAdminUserById,
};