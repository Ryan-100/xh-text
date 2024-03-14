import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";

const uploadImage = (data) => async (dispatch: Dispatch) => {
    dispatch(FetchRequest(types.CREATE_IMAGE_REQUEST));
    return await controller(apiRoutes.upload_image, data)
      .then((res) => {
        if (res?.error) {
          console.log(res.data);
        } else {
          dispatch(FetchSuccess(types.CREATE_IMAGE_SUCCESS, res?.data));
          return res?.data;
        }
      })
      .catch((error) =>
        dispatch(FetchFailure(types.CREATE_IMAGE_ERROR, error.message))
      );
  };

export const image = {
  uploadImage,
};
