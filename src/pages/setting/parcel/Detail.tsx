import React from "react";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../icons";
import { useDispatch } from "react-redux";
import { parcel } from "../../../store/actions";
import moment from "moment";

const ParcelDetail = () => {
  const [parcelData, setParcelData] = React.useState<any>();
  const { id: parcelId } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchParcelDetail = async () => {
      try {
        const res = await dispatch(parcel.getParcelById(parcelId) as any);
        setParcelData(res?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchParcelDetail();
  }, [dispatch, parcelId]);
  console.log(parcelData,'parcelData')
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () => {
    navigate("edit");
  };

  return (
    <>
    
    {parcelData && <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-[2px]">
        <div
          onClick={goBack}
          className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
        >
          <Icon name="leftArrow" />
          <p className="">Back</p>
        </div>
        <p className="text-2xl font-semibold">Parcel Type Detail</p>
        <div className="flex items-center text-base font-normal  h-10">
          <p className="py-2 px-2 border-r border-r-gray text-gray">
            Parcel Type
          </p>{" "}
          <p className=" py-2 px-2">Parcel Type Detail</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between p-6 bg-white rounded-[10px] drop-shadow">
        <div className="flex items-center justify-center space-x-[84px]">
          <div className="flex flex-col">
            <p className="text-gray leading-6">Created Date</p>
            <p className="text-secondary leading-6">{moment(parcelData?.created_at).format("D MMM YYYY")}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray leading-6">Created By</p>
            <p className="text-secondary leading-6">{parcelData?.created_by || "Unknown"}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div
            onClick={goToEdit}
            className="self-start rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
          >
            <Icon name="edit1" width={24} height={24} />
            <p className="text-[20px] text-white">Edit Parcel Type</p>
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
              <p className="text-gray">Parcel Type</p>
              <p className="text-secondary w-[252px]">{parcelData?.parcel_type}</p>
            </div>
            <div className="h-12 w-full py-3 px-4 flex items-center justify-between">
              <p className="text-gray">State</p>
              <p className="text-secondary w-[252px]">{parcelData?.state}</p>
            </div>
          </div>
          <img
            src="/parcel-type.png"
            alt="profile"
            className="w-[131px] h-[87px] self-center place-self-start"
          />
        </div>
      </div>
    </div>}</>
  );
};

export default ParcelDetail;
