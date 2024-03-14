import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import Editor from "../../../components/form/Editor";
import { UserGuideData, userguide } from "../../../store/actions";
import { useDispatch } from "react-redux";
import AlertModal from "../../../components/Modal/AlertModal";

const UserGuide = () => {
  const [template, setTemplate] = React.useState<string>();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => {
    navigate(-1);
  };

  const sendUserGuide = async (data: UserGuideData) => {
    const res = await dispatch(userguide.sendUserGuide(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
    }
  };

  const changeUserGuide = () => {
    sendUserGuide({ template });
  };

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center mb-[2px]">
          <div
            onClick={goBack}
            className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
          >
            <Icon name="leftArrow" />
            <p className="">Back</p>
          </div>
          <p className="text-2xl font-semibold">User Guide</p>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>{" "}
            <p className=" py-2 px-2">User Guide</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-sbetween p-6 bg-white rounded-[10px] drop-shadow">
          <div className="flex items-center justify-center space-x-8">
            <p className="text-gray leading-6">Current User Guide</p>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center space-y-6 p-6 bg-white rounded-[10px] drop-shadow">
          <p className="text-xl">Change User Guide for User App</p>
          <Editor setValue={setTemplate} defaultValue={""} />
          <button
            onClick={changeUserGuide}
            className="self-end rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
          >
            <Icon name="success" width={24} height={24} />
            <p className="text-[20px] text-white">Change</p>
          </button>
        </div>
      </div>
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New user guide0 has been created successfully."}
      />
    </>
  );
};

export default UserGuide;
