import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";

const createCounter = () => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.CREATE_COUNTER_REQUEST));
  return await controller(apiRoutes.create_counter)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_COUNTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.CREATE_COUNTER_ERROR, error.message))
    );
};

const getAllCounters = () => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_COUNTERS_REQUEST));
  return await controller(apiRoutes.all_counter)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_COUNTERS_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.GET_ALL_COUNTERS_ERROR, error.message))
    );
};

const getCounterById = (id: string) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.GET_COUNTER_BY_ID_REQUEST));
  return await controller(`${apiRoutes.main_counter}${id}`)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_COUNTER_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.GET_COUNTER_BY_ID_ERROR, error.message))
    );
};

const getOtherCounterById = (id: string) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.GET_COUNTER_BY_ID_REQUEST));
  return await controller(`${apiRoutes.other_counter}${id}`)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_COUNTER_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.GET_COUNTER_BY_ID_ERROR, error.message))
    );
};

const getMainCounterParcelDetail =
  (counterId, fromDate, toDate, skip, take, parcelType) => async (dispatch) => {
    dispatch(FetchRequest(types.GET_MAIN_COUNTER_PARCEL_DETAIL_REQUEST));
    

    const queryString = `?counter_id=${counterId}&from_date=${fromDate}&to_date=${toDate}&skip=${skip}&take=${take}&parcel_type=${parcelType}`;

    const fullUrl = `${apiRoutes.main_counter_parcel_detail}${queryString}`;

    return await controller(fullUrl)
      .then((res) => {
        if (res?.error) {
          dispatch(
            FetchFailure(types.GET_MAIN_COUNTER_PARCEL_DETAIL_ERROR, res.error)
          );
        } else {
          dispatch(
            FetchSuccess(types.GET_MAIN_COUNTER_PARCEL_DETAIL_SUCCESS, res)
          );
          return res;
        }
      })
      .catch((error) =>
        dispatch(
          FetchFailure(
            types.GET_MAIN_COUNTER_PARCEL_DETAIL_ERROR,
            error.message
          )
        )
      );
  };

const updateCounter = (id: string, data: any) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_COUNTER_REQUEST));
  return await controller(`${apiRoutes.update_counter}/${id}`, data)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_COUNTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.UPDATE_COUNTER_ERROR, error.message))
    );
};

const deleteCounter = (id: string) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.DELETE_COUNTER_REQUEST));
  return await controller(`${apiRoutes.delete_counter}/${id}`, id)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_COUNTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.DELETE_COUNTER_ERROR, error.message))
    );
};

export const counter = {
  createCounter,
  getAllCounters,
  getCounterById,
  getOtherCounterById,
  updateCounter,
  deleteCounter,
  getMainCounterParcelDetail,
};
