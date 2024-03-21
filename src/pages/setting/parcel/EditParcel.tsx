import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import { useForm } from "react-hook-form";
import InputSelect from "../../../components/form/InputSelect";
import { useDispatch } from "react-redux";
import {  parcel } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";
import { parcelStateOptions } from "./ParcelType";

const ParcelEdit = () => {
  const [parcelData, setParcelData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit } = useForm({defaultValues:{
    'parcel_type':parcelData?.parcel_type
  }});
  const { id: parcelId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchParcel = async () => {
      try {
        const res = await dispatch(parcel.getParcelById(parcelId) as any);
        setParcelData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchParcel();
  }, [dispatch, parcelId]);

  const updateParcel = async (data) => {
    const res = await dispatch(parcel.updateParcel(parcelId, data) as any);
    if (res?.statusCode === 200) {
      setIsSuccess(true);
      setNotFilled(false);
      goBack();
    }
  };


  const onSubmit = (data) => {
    if (data.state===0||1) {
      updateParcel(data);
    } else {
      setNotFilled(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {parcelData && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <div className="flex justify-between items-center mb-[2px]">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <p className="title">Edit Parcel Type</p>
            <div className="side-title  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Parcel Type
              </p>{" "}
              <p className=" py-2 px-2">Edit Parcel Type</p>
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
            <div className="flex space-x-6 justify-start w-full ">
              <div className="flex flex-col space-y-4 w-[780px]">
                <div className="h-12 w-full py-3 px-4 flex items-start ">
                  <p className="text-gray w-[252px] text-xl">Parcel Type</p>
                  <p className="text-secondary w-[252px] text-xl">
                    {parcelData?.parcel_type}
                  </p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center mb-6">
                  <p className="text-gray w-[252px] text-xl">State</p>
                  <div className="w-[528px]">
                    <InputSelect
                      fullWidth
                      name="state"
                      control={control}
                      label={"Select parcel state"}
                      options={parcelStateOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
            <Icon name="save" width={16} height={16} />
            <p className="btn-lg">Save Updates</p>
          </button>
        </form>
      )}
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"Amount Delivery Fee has been edited successfully."}
      />
      <AlertModal
        open={notFilled}
        onClose={() => setNotFilled(false)}
        title={"Alert"}
        body={"Kindly fill all fields with the necessary information."}
      />
    </>
  );
};

export default ParcelEdit;
