import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import { roleOptions } from "../../../layout/config";
import InputField from "../../../components/form/InputFiled";
import { useDispatch } from "react-redux";
import { WeightInterface, weight } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";
import { parcelStateOptions } from "../parcel/ParcelType";

const CreateParcelWeight = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createParcel = async (data: WeightInterface) => {
    const res = await dispatch(weight.createWeight(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setNotFilled(false);
      setValue("parcel_type", "");
    }
  };

  const onSubmit = ({ weight, state }: WeightInterface) => {
    if ((weight && state === 0) || 1) {
      createParcel({
        weight,
        state,
      });
    } else {
      setNotFilled(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div
            onClick={goBack}
            className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
          >
            <Icon name="leftArrow" />
            <p className="">Back</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold">Create Parcel Type</p>
          </div>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Parcel Type
            </p>
            <p className="py-2 px-2">Create Parcel Type</p>
          </div>
        </div>
        <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Weight</p>
            <div className="w-[528px]">
              <InputField
                name="weight"
                type="number"
                control={control}
                label={""}
                placeholder="Enter Weight"
                endPrefix="KG"
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">State</p>
            <div className="w-[528px]">
              <InputSelect
                fullWidth
                name="state"
                control={control}
                label={"Enter weight state"}
                options={parcelStateOptions}
              />
            </div>
          </div>
        </div>
        <button className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
          <Icon name="add" width={24} height={24} />
          <p className="text-[20px] text-white">Create</p>
        </button>
      </form>
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New Parcel Weight has been created successfully."}
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

export default CreateParcelWeight;
