import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import { useForm } from "react-hook-form";
import InputField from "../../../components/form/InputFiled";
import { useDispatch } from "react-redux";
import { region } from "../../../store/actions";
import AlertModal from "../../../components/Modal/AlertModal";

const EditRegion = () => {
  const [regionData, setRegionData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [notFilled, setNotFilled] = React.useState(false);

  const navigate = useNavigate();
  const { id: regionId } = useParams();
  const dispatch = useDispatch();
  const { control, handleSubmit,setValue } = useForm({
    defaultValues: {
      region_eng: regionData?.region_eng,
    },
  });

  React.useEffect(() => {
    const fetchRegionDetail = async () => {
      try {
        const res = await dispatch(region.getRegionById(regionId) as any);
        setRegionData(res?.data);
        setValue('region_eng',res?.data?.region_eng)
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchRegionDetail();
  }, [dispatch, regionId]);

  const updateRegion = async (data) => {
    const res = await dispatch(region.updateRegion(regionId, data) as any);
    if (res?.statusCode === 200) {
      setIsSuccess(true);
      setNotFilled(false);
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = ({ region_eng = regionData?.region_eng }) => {
    if (region_eng) {
      updateRegion({
        region_eng,
      });
    } else {
      setNotFilled(true);
    }
  };

  return (
    <>
      {regionData && (
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
            <p className="text-2xl font-semibold">Edit Region</p>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Region
              </p>
              <p className=" py-2 px-2">Edit Region</p>
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6 h-fit">
            <div className="flex space-x-6 justify-start w-full h-full">
              <div className="flex flex-col space-y-4 w-[780px]">
                <div className="h-12 w-full py-3 px-4 flex items-start ">
                  <p className="text-gray w-[252px] text-xl">City Branch</p>
                  <p className="text-secondary w-[252px] text-xl">
                    {regionData?.block?.city?.city_eng}
                  </p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center">
                  <p className="text-gray w-[252px] text-xl">
                    Region Name(eng)
                  </p>
                  <div className="w-[528px]">
                    <InputField
                      name="region_eng"
                      control={control}
                      defaultValue={regionData?.region_eng}
                      placeholder="Enter Region Name (English)"
                      label={""}
                    />
                  </div>
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
        body={"This region has been edited successfully."}
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

export default EditRegion;
