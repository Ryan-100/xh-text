import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageData } from "../../../service/auth";
import { RegionDataInterface, region } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const RegionCreate = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {all_blocks}= useSelector((state:any)=>state.block)
  const user_id = getLocalStorageData("user_id")

  const createRegion = async (data: RegionDataInterface) => {
    const res = await dispatch(region.createRegion(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setNotFilled(false);
      setValue("region_mm", "");
      setValue("region_cha", "");
      setValue("region_eng", "");
      setValue("prefix", "");
    }
  };

  const blockOptions = all_blocks ?all_blocks?.data?.map((block) => ({
    value: block.id,
    label: block.block_eng,
  })):[]

  const onSubmit = ({ region_mm, region_eng, region_cha, block_id, prefix }) => {
    if (region_mm && region_eng && region_cha && block_id && prefix) {
      createRegion({
        region_mm,
        region_eng,
        region_cha,
        block_id,
        prefix,
        active: 1,
        created_by:user_id,
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
          <p className="text-2xl font-semibold">Create Region</p>
        </div>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">Region</p>
          <p className="py-2 px-2">Create Region</p>
        </div>
      </div>
      <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
        <div className="flex items-center justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">
            Block
          </p>
          <div className="w-[528px]">
            <InputSelect
              fullWidth
              name="block_id"
              control={control}
              label={"Choose block"}
              options={blockOptions}
            />
          </div>
        </div>

        <div className="flex items-start justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">
            Region Name (mm)
          </p>
          <div className="w-[528px]">
            <InputField
              name="region_mm"
              control={control}
              placeholder="Enter Region (Burmese)"
              label={""}
            />
          </div>
        </div>
        <div className="flex items-start justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">
            Region Name (cha)
          </p>
          <div className="w-[528px]">
            <InputField
              name="region_cha"
              control={control}
              placeholder="Enter Region (Chinese)"
              label={""}
            />
          </div>
        </div>
        <div className="flex items-start justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">
            Region Name (eng)
          </p>
          <div className="w-[528px]">
            <InputField
              name="region_eng"
              control={control}
              placeholder="Enter Region (English)"
              label={""}
            />
          </div>
        </div>
        <div className="flex items-start justify-between w-[780px]">
          <p className="text-sm md:text-base xl:text-xl text-gray">
            Prefix
          </p>
          <div className="w-[528px]">
            <InputField
              name="prefix"
              control={control}
              placeholder="Enter prefix"
              label={""}
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
        body={"New region has been created successfully."}
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

export default RegionCreate;
