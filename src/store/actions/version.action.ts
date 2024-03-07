
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';

export interface AppVersionData {
  app_name: string;
  platform: string;
  version: string;
  link: string;
  is_force_update: number;
} 
interface AppVersionFilter {
  skip:string|number;
  take:string|number;
  filter:string;
}
const sendAppVersion = (data:AppVersionData) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.POST_VERSION_REQUEST));
  return await controller(apiRoutes.send_version,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.POST_VERSION_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.POST_VERSION_ERROR, error.message)));
};

const getAppVersionHistory = (data:AppVersionFilter) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_VERSION_HISTORY_REQUEST));
  return await controller(`${apiRoutes.version_history}/pages?skip=${data.skip}&take=${data.take}&filter[app_name]=${data.filter}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_VERSION_HISTORY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_VERSION_HISTORY_ERROR, error.message)));
};

export const version = {
  sendAppVersion,
  getAppVersionHistory,
};