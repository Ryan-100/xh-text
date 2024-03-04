import React from "react";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../icons";
import { useDispatch } from "react-redux";
import { counter } from "../../store/actions/counter.action";
import moment from "moment";
import Modal from "../../components/Modal";

const CounterDetail = () => {
  const [counterData, setCounterData] = React.useState<any>();
  const [isDelete, setIsDelete] = React.useState<boolean>();

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

  const goBack = () => {
    navigate(-1);
  };
  const goToEdit = () => {
    navigate(`/counters/edit/${counterId}`);
  };

  const deleteHandler = () =>{}
  console.log(counterData, "counter data");
  return (
    <>
      {counterData && (
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-[2px]">
            <div
              onClick={goBack}
              className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
            >
              <Icon name="leftArrow" />
              <p className="">Back</p>
            </div>
            <p className="text-2xl font-semibold">Counter Detail</p>
            <div className="flex items-center text-base font-normal  h-10">
              <p className="py-2 px-4 border-r border-r-gray text-gray">
                Counter
              </p>{" "}
              <p className=" py-2 px-4">Counter Detail</p>
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow flex flex-col items-start p-6 space-y-6">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-center space-x-[84px]">
                <div className="flex flex-col">
                  <p className="text-gray leading-6">Joined Date</p>
                  <p className="text-secondary leading-6">
                    {moment(counterData?.created_at).format("D MMM YYYY")}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray leading-6">Now</p>
                  <p className="text-secondary leading-6">
                    {moment(new Date()).format("D MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div
                  onClick={goToEdit}
                  className="self-start cursor-pointer rounded-[10px] bg-primary py-3 px-[62.5px] flex items-center space-x-3 "
                >
                  <Icon name="edit1" width={24} height={24} />
                  <p className="text-[20px] text-white">Edit Information</p>
                </div>
                <div
                  className="editButton h-12"
                  onClick={() => setIsDelete(true)}
                >
                  <Icon name="delete2" />
                </div>
              </div>
            </div>
            <Divider className="w-full" />
            <div className="flex space-x-[176px] justify-start w-full">
              <div className="flex flex-col">
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
                  <p className="text-gray">City</p>
                  <p className="text-secondary w-[235px]">
                    {counterData?.city?.city_eng}
                  </p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between">
                  <p className="text-gray">Counter</p>
                  <p className="text-secondary w-[235px]">
                    {counterData?.name}
                  </p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1">
                  <p className="text-gray">Password</p>
                  <p className="text-secondary w-[235px]">123456</p>
                </div>
                <div className="h-fit w-[411px] py-3 px-4 flex items-start justify-between ">
                  <p className="text-gray">Address</p>
                  <p className="text-secondary w-[235px]">
                    {counterData?.address}
                  </p>
                </div>
                <div className="h-12 w-[411px] py-3 px-4 flex items-center justify-between bg-gray-light-1 mb-6">
                  <p className="text-gray">Created By</p>
                  <p className="text-secondary w-[235px]">
                    {counterData?.created_by}
                  </p>
                </div>
              </div>
              <img
                src="/counter.svg"
                alt="profile"
                className="w-[247px] h-[184px] self-center place-self-start"
              />
            </div>
          </div>
          <div className="bg-white rounded-[10px] shadow p-6 grid grid-cols-12 grid-rows-1">
            <div className="w-[136px]   col-span-2 flex flex-col space-y-2">
              <p className="h-[48px] text-gray">Total Admins</p>
              <p className="h-[48px] text-gray">Total Riders</p>
              <p className="h-[48px] text-gray">Total Scanned Packages</p>
            </div>
            <div className="w-[253px]   col-span-2 flex flex-col space-y-2">
              <p className="h-[48px]">3</p>
              <p className="h-[48px]">15</p>
              <p className="h-[48px]">1532</p>
            </div>
            <div className=" col-span-2 flex flex-col space-y-2">
              <p className="h-[48px] text-primary">View All</p>
              <p className="h-[48px] text-primary">View All</p>
              <p className="h-[48px] text-primary">View All</p>
            </div>
          </div>
        </div>
      )}
      {isDelete && (
        <Modal
          title="Confirm"
          body={"Are you sure to delete this counter? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={deleteHandler}
        />
      )}
    </>
  );
};

export default CounterDetail;
