import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageData } from "../../../service/auth";
import { RoleDataInterface, role } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const RoleCreate = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { all_counters } = useSelector((state: any) => state.counter);
  const { all_cities } = useSelector((state: any) => state.city);

  const user_id = getLocalStorageData("user_id");

  const createParcel = async (data: RoleDataInterface) => {
    const res = await dispatch(role.createRole(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setNotFilled(false);
      setValue("name", "");
      setValue("description", "");
    }
  };

  const counterOptions = all_counters
    ? all_counters?.data?.map((counter) => ({
        value: counter.id,
        label: counter.name,
      }))
    : [];

  const cityOptions = all_cities
    ? all_cities?.data?.map((city) => ({
        value: city.id,
        label: city.city_eng,
      }))
    : [];

  const onSubmit = ({ city_id, counter_id, name, description }) => {
    if (city_id && counter_id && name && description) {
      createParcel({
        city_id,
        counter_id,
        name,
        description,
        // created_by:user_id,
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="flex justify-between items-center">
          <div
            onClick={goBack}
            className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
          >
            <Icon name="leftArrow" />
            <p className="">Back</p>
          </div>
          <div className="text-center">
            <p className="title">Create Admin Role</p>
          </div>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Admin Role
            </p>
            <p className="py-2 px-2">Create Admin Role</p>
          </div>
        </div>
        <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Branch</p>
            <div className="w-[528px]">
              <InputSelect
                fullWidth
                name="city_id"
                control={control}
                label={"Choose city"}
                options={cityOptions}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">Counter</p>
            <div className="w-[528px]">
              <InputSelect
                fullWidth
                name="counter_id"
                control={control}
                label={"Choose counter"}
                options={counterOptions}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Role Name
            </p>
            <div className="w-[528px]">
              <InputField
                name="name"
                control={control}
                label={""}
                placeholder="Enter Admin Role Name"
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Role Description
            </p>
            <div className="w-[528px]">
              <InputField
                name="description"
                control={control}
                label={""}
                placeholder="Enter Role Description"
              />
            </div>
          </div>
        </div>
        <button className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
          <Icon name="add" width={24} height={24} />
          <p className="btn-lg">Create</p>
        </button>
      </form>
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New role has been created successfully."}
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

export default RoleCreate;
