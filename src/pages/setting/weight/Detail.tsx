import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import { useDispatch } from "react-redux";
import { weight } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";
import { formatDate } from "../../../utils";

const WeightDetail = () => {
  const [weightData, setWeightData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const { id: weightId } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchWeightDetail = async () => {
      try {
        const res = await dispatch(weight.getWeightById(weightId) as any);
        setWeightData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchWeightDetail();
  }, [dispatch, weightId]);

  const deleteHandler = async () => {
    const res = await dispatch(weight.deleteWeight(weightId) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      goBack();
    }
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () => {
    navigate("edit");
  };

  return (
    <>
      {weightData && 
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-[2px]">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <p className="text-2xl font-semibold">Parcel Weight Detail</p>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Weight
              </p>{" "}
              <p className=" py-2 px-2">Weight Detail</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-6 bg-white rounded-[10px] drop-shadow">
            <div className="flex items-center justify-center space-x-[84px]">
              <div className="flex flex-col">
                <p className="text-gray leading-6">Created Date</p>
                <p className="text-secondary leading-6">{formatDate(weightData?.created_at)}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray leading-6">Created By</p>
                <p className="text-secondary leading-6">{weightData?.created_user?.username || "Unknown"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div
                onClick={goToEdit}
                className="self-start rounded-[10px] bg-primary cursor-pointer py-3 px-[62.5px] flex items-center space-x-3 "
              >
                <Icon name="edit1" width={24} height={24} />
                <p className="text-[20px] text-white">Edit Weight</p>
              </div>
              <div className="editButton h-12">
                <Icon name="delete2" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
            <div className="flex space-x-[210px] justify-start w-full ">
              <div className="flex flex-col space-y-4 w-[504px]">
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Weight</p>
                  <p className="text-secondary w-[252px]">{weightData?.weight} KG</p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">State</p>
                  <p className="text-secondary w-[252px]">{weightData?.state===1?"Default":"Other"}</p>
                </div>
              </div>
              <img
                src="/weight.png"
                alt="profile"
                className="w-[131px] h-[87px] self-center place-self-start"
              />
            </div>
          </div>
        </div>
      }
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={"Are you sure to delete this define amount? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={deleteHandler}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={"The weight is successfully deleted. Please check into list."}
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default WeightDetail;
