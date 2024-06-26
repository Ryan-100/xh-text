
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';
import { routeFilter } from '../../utils';

export interface SystemNotificationData {
  send_type: string;
  noti_type: string;
  customer_id: string;
  image_url: string;
  title: string;
  message: string;
} 

const sendSytemNotification = (data:SystemNotificationData) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.POST_SYSTEM_NOTI_REQUEST));
  return await controller(apiRoutes.send_system_noti,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.POST_SYSTEM_NOTI_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.POST_SYSTEM_NOTI_ERROR, error.message)));
};

const getSystemNotificationHistory = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_SYSTEM_NOTI_HISTORY_REQUEST));
  return await controller(apiRoutes.system_noti_history)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_SYSTEM_NOTI_HISTORY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_SYSTEM_NOTI_HISTORY_ERROR, error.message)));
};

const getSystemNotificationHistoryByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_SYSTEM_NOTI_HISTORY_REQUEST));
  return await controller(`${apiRoutes.system_noti_history}/notification-list-by-filter?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_SYSTEM_NOTI_HISTORY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_SYSTEM_NOTI_HISTORY_ERROR, error.message)));
};

export const notification = {
  sendSytemNotification,
  getSystemNotificationHistory,
  getSystemNotificationHistoryByFilter
};