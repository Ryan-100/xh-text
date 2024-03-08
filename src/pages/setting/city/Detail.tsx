import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import { useDispatch } from "react-redux";
import { city } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";
import { formatDate } from "../../../utils";

const CityDetail = () => {
  const [cityData, setCityData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const { id: cityId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchParcelDetail = async () => {
      try {
        const res = await dispatch(city.getCityById(cityId) as any);
        setCityData(res?.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchParcelDetail();
  }, [dispatch, cityId]);

  const deleteHandler = async () => {
    const res = await dispatch(city.deleteCity(cityId) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      goBack();
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () => {
    navigate("edit");
  };

  return (
    <>
      {cityData && (
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-[2px]">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <p className="text-2xl font-semibold">Branch Detail</p>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-2 border-r border-r-gray text-gray">
                Branch
              </p>{" "}
              <p className=" py-2 px-2">Branch Detail</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-6 bg-white rounded-[10px] drop-shadow">
            <div className="flex items-center justify-center space-x-[84px]">
              <div className="flex flex-col">
                <p className="text-gray leading-6">Created Date</p>
                <p className="text-secondary leading-6">{formatDate(cityData?.created_at)}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray leading-6">Created By</p>
                <p className="text-secondary leading-6">{cityData?.created_by || "Unknown"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div
                onClick={goToEdit}
                className="self-start rounded-[10px] bg-primary cursor-pointer py-3 px-[62.5px] flex items-center space-x-3 "
              >
                <Icon name="edit1" width={24} height={24} />
                <p className="text-[20px] text-white">Edit Branch</p>
              </div>
              <div className="editButton h-12" onClick={()=>setIsDelete(true)}>
                <Icon name="delete2" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
            <div className="flex space-x-2 justify-start w-full ">
              <div className="flex flex-col space-y-4 w-[504px]">
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">City Name</p>
                  <p className="text-secondary w-[252px]">{cityData?.city_eng}</p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Prefix</p>
                  <p className="text-secondary w-[252px]">{cityData?.prefix}</p>
                </div>
                <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Currency</p>
                  <p className="text-secondary w-[252px]">{cityData?.currency?.name}</p>
                </div>
              </div>
              <img
                src="/branch.png"
                alt="branch"
                className="w-[504px] h-[155px] self-center place-self-start"
              />
            </div>
          </div>
        </div>
      )}
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={"Are you sure to delete this define city? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={deleteHandler}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={"The city is successfully deleted. Please check into list."}
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default CityDetail;
