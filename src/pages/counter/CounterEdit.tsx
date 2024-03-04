import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../icons";
import InputField from "../../components/form/InputFiled";
import MuiTextarea from "../../components/form/TextArea";
import InputSelect from "../../components/form/InputSelect";
import { counterOptions } from "../../layout/config";
import AlertModal from "../../components/Modal/AlertModal";
import { useDispatch } from "react-redux";
import { counter } from "../../store/actions/counter.action";

const CounterEdit = () => {
  const [counterData, setCounterData] = React.useState<any>();
  const [success, setSuccess] = React.useState<boolean>(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit,setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const { id: counterId } = useParams();
  const dispatch = useDispatch();

    React.useEffect(() => {
    const fetchCounter = async () => {
      try {
        const res = await dispatch(counter.getCounterById(counterId) as any);
        setCounterData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchCounter();
  }, [dispatch, counterId]);

  React.useEffect(()=>{
    if(counterData){
      setValue('name',counterData?.name)
      setValue('block_id',counterData?.block_id)
      setValue('city',counterData?.city_id)
      setValue('phone',counterData?.phone);
      setValue('address',counterData?.address)
      setValue('address_block_id',counterData?.address_block_id)
      setValue('address_region_id',counterData?.address_region_id)
    }
  },[counterData])

  const updateCounterHandler =async (data) =>{
    const res = await dispatch(counter.updateCounter(counterId,data) as any);
    if(res.status === 201){
      setSuccess(true);
    }
  }

  const goBack = () => {
    navigate(-1);
  };
  const onSubmit = (data) => {
    console.log(data);
    setNotFilled(true);
  };
  return (
    <>
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
          <p className="text-2xl font-semibold">Edit Counter </p>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Counter
            </p>{" "}
            <p className="py-2 px-2">Edit Counter</p>
          </div>
        </div>
        <div className="bg-white rounded-t-[10px] flex flex-col items-start p-6 space-y-6">
          <div className="flex flex-col space-y-4">
            <p className="text-2xl font-medium">Change Information</p>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Counter Name
              </p>
              <div className="w-[528px]">
                <InputField
                  name="name"
                  control={control}
                  label={""}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                City Branch
              </p>
              <div className="w-[528px]">
                <InputSelect
                  label={"Select your branch"}
                  fullWidth
                  name="city"
                  control={control}
                  options={counterOptions}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Counter Phone
              </p>
              <div className="w-[528px]">
                <InputField
                  name="phone"
                  control={control}
                  label={""}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-b-[10px] flex flex-col items-start p-6 space-y-6">
          <div className="flex flex-col space-y-4">
            <p className="text-2xl font-medium">Change Address</p>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Current Address
              </p>
              <div className="w-[528px]">
                <MuiTextarea
                  name="address"
                  control={control}
                  placeholder="Enter Current Address"
                  rows={3.5}
                  label={""}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">Block</p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="address_block_id"
                  control={control}
                  label={""}
                  options={counterOptions}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Region Type
              </p>
              <div className="w-[528px]">
                <InputSelect
                  fullWidth
                  name="address_region_id"
                  control={control}
                  label={""}
                  options={counterOptions}
                />
              </div>
            </div>

            <div className="flex items-center justify-between w-[780px]">
              <p className="text-sm md:text-base xl:text-xl text-gray">
                Address Detail
              </p>
              <div className="w-[528px]">
                <MuiTextarea
                  name="address"
                  control={control}
                  placeholder="Enter New Address"
                  rows={2.5}
                  label={""}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 ">
          <Icon name="save" width={16} height={16} />
          <p className="text-[20px] text-white">Save Updates</p>
        </button>
      </form>
      <AlertModal
        title="Alert"
        body="Kindly fill all fields with the necessary information."
        open={notFilled}
        onClose={() => setNotFilled(false)}
      />
    </>
  );
};

export default CounterEdit;
