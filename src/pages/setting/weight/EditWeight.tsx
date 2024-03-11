import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import { useForm } from "react-hook-form";
import InputField from "../../../components/form/InputFiled";
import { useDispatch } from "react-redux";
import { weight } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const EditWeight = () => {
  const [weightData, setWeightData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      weight: weightData?.weight,
    },
  });
  const { id: weightId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchWeight = async () => {
      try {
        const res = await dispatch(weight.getWeightById(weightId) as any);
        setWeightData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchWeight();
  }, [dispatch, weightId]);

  const updateWeight = async (data) => {
    const res = await dispatch(weight.updateWeight(weightId, data) as any);
    if (res?.statusCode === 200) {
      setIsSuccess(true);
      setNotFilled(false);
      goBack();
    }
  };

  const onSubmit = (data) => {
    if (data.weight) {
      updateWeight(data);
    } else {
      setNotFilled(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {weightData && (
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
            <p className="text-2xl font-semibold">Edit Weight</p>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Weight
              </p>{" "}
              <p className=" py-2 px-2">Edit Weight</p>
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
            <div className="flex space-x-6 justify-start w-full ">
              <div className="flex flex-col space-y-4 w-[780px]">
                <div className="h-12 w-full py-3 px-4 flex items-center ">
                  <p className="text-gray w-[252px] text-xl">Parcel Type</p>
                  <div className="w-[528px]">
                    <InputField
                      name="weight"
                      type="number"
                      control={control}
                      label={""}
                      defaultValue={weightData?.weight}
                      placeholder="Enter Weight"
                      endPrefix="KG"
                    />
                  </div>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center mb-6">
                  <p className="text-gray w-[252px] text-xl">State</p>
                  <p className="text-secondary w-[252px] text-xl">
                    {weightData?.state === 1 ? "Default" : "Other"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
            <Icon name="save" width={16} height={16} />
            <p className="text-[20px] text-white">Save Updates</p>
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

export default EditWeight;
