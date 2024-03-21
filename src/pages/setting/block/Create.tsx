import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import InputField from "../../../components/form/InputFiled";
import { useDispatch, useSelector } from "react-redux";
import AlertModal from "../../../components/Modal/AlertModal";
import { BlockDataInterface, block } from "../../../store/actions";
import { getLocalStorageData } from "../../../service/auth";

const BlockCreate = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [notFilled, setNotFilled] = React.useState(false);
  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {all_cities}= useSelector((state:any)=>state.city)

  const user_id = getLocalStorageData("user_id")

  const createParcel = async (data: BlockDataInterface) => {
    const res = await dispatch(block.createBlock(data) as any);
    if (res?.statusCode === 201) {
      setIsSuccess(true);
      setNotFilled(false);
      setValue("block_mm", "");
      setValue("block_cha", "");
      setValue("block_eng", "");
      setValue("prefix", "");
    }
  };

  const cityOptions = all_cities
  ? all_cities?.data?.map((city) => ({
      value: city.id,
      label: city.city_eng,
    }))
  : [];


  const onSubmit = ({ block_mm, block_eng, block_cha, city_id, prefix }) => {
    if (block_mm && block_eng && block_cha && city_id && prefix) {
      createParcel({
        block_mm,
        block_eng,
        block_cha,
        city_id,
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
            <p className="title">Create Block</p>
          </div>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">Block</p>
            <p className="py-2 px-2">Create Block</p>
          </div>
        </div>
        <div className="bg-white p-6 w-full flex flex-col space-y-4 rounded-[10px] drop-shadow">
          <div className="flex items-center justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              City Branch
            </p>
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

          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Block Name(mm)
            </p>
            <div className="w-[528px]">
              <InputField
                name="block_mm"
                control={control}
                placeholder="Enter Block (Burmese)"
                label={""}
              />
            </div>
          </div>
          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Block Name(cha)
            </p>
            <div className="w-[528px]">
              <InputField
                name="block_cha"
                control={control}
                placeholder="Enter Block (Chinese)"
                label={""}
              />
            </div>
          </div>
          <div className="flex items-start justify-between w-[780px]">
            <p className="text-sm md:text-base xl:text-xl text-gray">
              Block Name(eng)
            </p>
            <div className="w-[528px]">
              <InputField
                name="block_eng"
                control={control}
                placeholder="Enter Block (English)"
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
        <button className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
          <Icon name="add" width={24} height={24} />
          <p className="btn-lg">Create</p>
        </button>
      </form>
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"New Block has been created successfully."}
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

export default BlockCreate;
