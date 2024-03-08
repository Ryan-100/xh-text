import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../icons";
import InputField from "../../components/form/InputFiled";
import MuiTextarea from "../../components/form/TextArea";
import InputSelect from "../../components/form/InputSelect";
import { counterOptions } from "../../layout/config";
import AlertModal from "../../components/Modal/AlertModal";
import { useDispatch } from "react-redux";
import { counter, region } from "../../store/actions";

const CreateCounter = () => {
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const [counterOptions, setCounterOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);

  const goBack = () => {
    navigate(-1);
  };
  const onSubmit = (data) => {
    console.log(data);
    setNotFilled(true);
  };
  const [data, setData] = useState();

  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchCounters = async () => {
      try {
        const res = await dispatch(counter.getAllCounters() as any);
        console.log(res)
        const options = res.data.map((counter) => ({
          label: counter.city.city_eng, // Use city_eng as label
          value: counter.id, // Use counter id as value
        }));
        setCounterOptions(options);
        setData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchCounters();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchRegion = async () => {
      try {
        const res = await dispatch(region.getAllRegion() as any);
        console.log(res,"region")
        const options = res.data.map((region) => ({
          label: region.city.city_eng, // Use city_eng as label
          value: region.id, // Use counter id as value
        }));
        setRegionOptions(options);
        setData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchRegion();
  }, [dispatch]);




  console.log(data);
 
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
          <p className="text-2xl font-semibold">Create Counter </p>
          <div className="flex items-center text-base font-normal  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Counter
            </p>{" "}
            <p className="py-2 px-2">Create Counter</p>
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
                  placeholder="Enter Counter Name"
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
                  placeholder="Enter Counter Phone"
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
                  label={"Select Block"}
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
                  label={"Select Region Type"}
                  options={regionOptions}
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

export default CreateCounter;
