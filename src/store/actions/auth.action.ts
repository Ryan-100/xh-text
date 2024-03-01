
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import { setToken } from '../../service/auth';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';

interface LoginData {
  username: string;
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
        dispatch(FetchSuccess(types.POST_LOGIN_SUCCESS, res?.data));
        setToken({
          j_token: res?.data?.data?.access_token          ,
        });
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.POST_LOGIN_ERROR, error.message)));
};

export const auth = {
  login,
};