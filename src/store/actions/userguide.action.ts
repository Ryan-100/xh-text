import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";

export interface UserGuideData {
  template: string;
}

const sendUserGuide = (data: UserGuideData) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.SEND_USER_GUIDE_REQUEST));
  return await controller(apiRoutes.create_userguide, data)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.SEND_USER_GUIDE_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.SEND_USER_GUIDE_ERROR, error.message))
    );
};

export const userguide = {
  sendUserGuide,
};
