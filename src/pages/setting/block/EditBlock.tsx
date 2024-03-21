import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import { useForm } from "react-hook-form";
import InputField from "../../../components/form/InputFiled";
import { useDispatch } from "react-redux";
import { block } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const EditBlock = () => {
  const [blockData, setblockData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [notFilled, setNotFilled] = React.useState(false);

  const navigate = useNavigate();
  const { id: blockId } = useParams();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      block_mm: blockData?.block_mm,
      block_cha: blockData?.block_cha,
      block_eng: blockData?.block_eng,
      city_id: blockData?.city_id,
      prefix: blockData?.prefix,
    },
  });

  React.useEffect(() => {
    const fetchCityDetail = async () => {
      try {
        const res = await dispatch(block.getBlockById(blockId) as any);
        setblockData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchCityDetail();
  }, [dispatch, blockId]);

  const updateBlock = async (data) => {
    const res = await dispatch(block.updateBlock(blockId, data) as any);
    if (res?.statusCode === 200) {
      setIsSuccess(true);
      setNotFilled(false);
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = ({ block_mm, block_eng, block_cha, prefix }) => {
    if (block_mm && block_eng && block_cha && prefix) {
      updateBlock({
        block_mm,
        block_eng,
        block_cha,
        prefix,
      });
    } else {
      setNotFilled(true);
    }
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
          <p className="title">Edit Block</p>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">Block</p>
            <p className=" py-2 px-2">Edit Block</p>
          </div>
        </div>

        <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6 h-fit">
          <div className="flex space-x-6 justify-start w-full h-full">
            <div className="flex flex-col space-y-4 w-[780px]">
              <div className="h-12 w-full py-3 flex items-start ">
                <p className="text-gray w-[252px] text-xl">City Branch</p>
                <p className="text-secondary w-[252px] text-xl">
                  {blockData?.city?.city_eng}
                </p>
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
          </div>
        </div>
        <button className="self-start rounded-[10px] bg-primary btn-lg-padding flex items-center space-x-3 ">
          <Icon name="save" width={16} height={16} />
          <p className="btn-lg">Save Updates</p>
        </button>
      </form>
      <AlertModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title={"Success"}
        body={"This block has been edited successfully."}
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

export default EditBlock;
