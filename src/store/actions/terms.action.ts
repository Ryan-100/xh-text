import { Dispatch } from "redux";
import controller, { apiRoutes } from "../../controller";
import * as types from "../type";
import { FetchFailure, FetchRequest, FetchSuccess } from "./typehandle.action";

export interface TermAndPolicyData {
  template: string;
}

const sendTermsAndPolicy = (data: TermAndPolicyData) => async (dispatch: Dispatch) => {
  dispatch(FetchRequest(types.SEND_TERMS_AND_POLICY_REQUEST));
  return await controller(apiRoutes.create_terms, data)
    .then((res) => {
      if (res?.error) {
        console.log(res.data);
      } else {
        dispatch(FetchSuccess(types.SEND_TERMS_AND_POLICY_SUCCESS, res?.data));
        return res?.data;
      }
    })
    .catch((error) =>
      dispatch(FetchFailure(types.SEND_TERMS_AND_POLICY_ERROR, error.message))
    );
};

export const terms = {
  sendTermsAndPolicy,
};
