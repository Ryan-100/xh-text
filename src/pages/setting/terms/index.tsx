import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../icons";
import AlertModal from "../../../components/Modal/AlertModal";
import Editor from "../../../components/form/Editor";
import { TermAndPolicyData, terms } from "../../../store/actions";
import { useDispatch } from "react-redux";

const TermsAndPolicy = () => {
  const [template, setTemplate] = React.useState<string>();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => {
    navigate(-1);
  };

  const sendTermAndPolicy = async (data: TermAndPolicyData) => {
    const res = await dispatch(terms.sendTermsAndPolicy(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
    }
  };

  const changeTermAndPolicy = () => {
    sendTermAndPolicy({ template });
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
          <p className="text-2xl font-semibold">Terms & Policy</p>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>{" "}
            <p className=" py-2 px-2">Terms & Policy</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between p-6 bg-white rounded-[10px] drop-shadow">
          <div className="flex items-center justify-center space-x-8">
            <p className="text-gray leading-6">Current Terms & Policy</p>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center space-y-6 p-6 bg-white rounded-[10px] drop-shadow">
          <p className="text-xl">Change User Guide for User App</p>
          <Editor setValue={setTemplate} defaultValue={""} />
          <button
            onClick={changeTermAndPolicy}
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
        body={"New terms and policy has been created successfully."}
      />
    </>
  );
};

export default TermsAndPolicy;
