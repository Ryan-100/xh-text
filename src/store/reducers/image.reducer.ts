import * as types from '../type';
export interface ImageState {
  error: string,
  isLoading: boolean,
  image_data: any,
}

export type ImageAction = {
  type: string;
  payload: any; // Adjust the type based on your actual actions
};

const initialState = {
  error: null,
  isLoading: false,
  image_data: null,
};

const image = (state = initialState, action:ImageAction) => {
  switch (action.type) {
    case types.CREATE_IMAGE_REQUEST: // typeName //*for image upload
      return {
        ...state,
        isLoading: true,
      };
    case types.CREATE_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        image_data: action.payload,
      };
    case types.CREATE_IMAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default image;
