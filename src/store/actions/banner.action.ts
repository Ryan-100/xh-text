
import { Dispatch } from 'redux';
import controller, { apiRoutes } from '../../controller';
import * as types from '../type';
import { FetchFailure, FetchRequest, FetchSuccess } from './typehandle.action';
import { routeFilter } from '../../utils';

export interface BannerInteface{
  image_url: string;
  link: string;
  active: number;
}

export interface AppBannerInteface{
  image_url: string;
  title: string;
  description: string;
  active: number;
}

export interface AppJustBannerInteface{
  image_url: string;
  active: number;
}

const createBanner = (data:BannerInteface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_BANNER_REQUEST));
  return await controller(apiRoutes.create_ads_banner,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_BANNER_ERROR, error.message)));
};

const getAllBanners = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_BANNER_REQUEST));
  return await controller(apiRoutes.all_ads_banner)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_BANNER_ERROR, error.message)));
};


const getAllBannersByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_BANNER_FILTER_REQUEST));
  return await controller(`${apiRoutes.all_ads_banner}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_BANNER_FILTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_BANNER_FILTER_ERROR, error.message)));
};

const getBannerById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_BANNER_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_ads_banner}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_BANNER_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_BANNER_BY_ID_ERROR, error.message)));
};

const updateBanner = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_BANNER_REQUEST));
  return await controller(`${apiRoutes.update_ads_banner}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_BANNER_ERROR, error.message)));
};

const deleteBanner = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_BANNER_REQUEST));
  return await controller(`${apiRoutes.delete_ads_banner}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_BANNER_ERROR, error.message)));
};

//*------------------- App Banner ---------------------

const createAppBanner = (data:AppBannerInteface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_APP_BANNER_REQUEST));
  return await controller(apiRoutes.create_app_banner,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_APP_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_APP_BANNER_ERROR, error.message)));
};

const getAllAppBanners = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_APP_BANNER_REQUEST));
  return await controller(apiRoutes.all_app_banner)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_APP_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_APP_BANNER_ERROR, error.message)));
};


const getAllAppBannersByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_APP_BANNER_FILTER_REQUEST));
  return await controller(`${apiRoutes.all_app_banner}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_APP_BANNER_FILTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_APP_BANNER_FILTER_ERROR, error.message)));
};

const getAppBannerById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_APP_BANNER_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_app_banner}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_APP_BANNER_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_APP_BANNER_BY_ID_ERROR, error.message)));
};

const updateAppBanner = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_APP_BANNER_REQUEST));
  return await controller(`${apiRoutes.update_app_banner}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_APP_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_APP_BANNER_ERROR, error.message)));
};

const deleteAppBanner = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_APP_BANNER_REQUEST));
  return await controller(`${apiRoutes.delete_app_banner}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_APP_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_APP_BANNER_ERROR, error.message)));
};
//*------------------- App Just Banner ---------------------

const createAppJustBanner = (data:AppJustBannerInteface) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.CREATE_JUST_BANNER_REQUEST));
  return await controller(apiRoutes.create_app_just_banner,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.CREATE_JUST_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.CREATE_JUST_BANNER_ERROR, error.message)));
};

const getAllAppJustBanners = () => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_JUST_BANNER_REQUEST));
  return await controller(apiRoutes.all_app_just_banner)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_JUST_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_JUST_BANNER_ERROR, error.message)));
};


const getAllAppJustBannersByFilter = (params) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_ALL_JUST_BANNER_FILTER_REQUEST));
  return await controller(`${apiRoutes.all_app_just_banner}/pages?${routeFilter(params)}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_ALL_JUST_BANNER_FILTER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_ALL_JUST_BANNER_FILTER_ERROR, error.message)));
};

const getAppJustBannerById = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.GET_JUST_BANNER_BY_ID_REQUEST));
  return await controller(`${apiRoutes.get_app_just_banner}/${id}`)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.GET_JUST_BANNER_BY_ID_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.GET_JUST_BANNER_BY_ID_ERROR, error.message)));
};

const updateAppJustBanner = (id:string,data:any) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.UPDATE_JUST_BANNER_REQUEST));
  return await controller(`${apiRoutes.update_app_just_banner}/${id}`,data)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.UPDATE_JUST_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.UPDATE_JUST_BANNER_ERROR, error.message)));
};

const deleteAppJustBanner = (id:string) => async (dispatch:Dispatch) => {
  dispatch(FetchRequest(types.DELETE_JUST_BANNER_REQUEST));
  return await controller(`${apiRoutes.delete_app_just_banner}/${id}`,id)
    .then(res => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.DELETE_JUST_BANNER_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch(error => dispatch(FetchFailure(types.DELETE_JUST_BANNER_ERROR, error.message)));
};

export const banner = {
  createBanner,
  getAllBanners,
  getAllBannersByFilter,
  getBannerById,
  updateBanner,
  deleteBanner,

  createAppBanner,
  getAllAppBanners,
  getAllAppBannersByFilter,
  getAppBannerById,
  updateAppBanner,
  deleteAppBanner,

  createAppJustBanner,
  getAllAppJustBanners,
  getAllAppJustBannersByFilter,
  getAppJustBannerById,
  updateAppJustBanner,
  deleteAppJustBanner,
};
