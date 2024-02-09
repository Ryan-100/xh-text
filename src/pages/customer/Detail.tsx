import React, { useRef, useState } from "react";
import Icon from "../../icons";
import MuiTextarea from "../../components/form/TextArea";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";

const Detail = () => {
  const [isDelivery, setIsDelivery] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef(null);

  const { control, getValues } = useForm({
    defaultValues: {
      address: `收货人: 小胡转xh2022
    手机号码: 19912930888
    所在地区: 云南省临沧市沧源佤族自治县勐董镇
    详细地址:xh2022勐董镇巴烧克美食城46栋(勿删小胡 xh2022 XH Testing 0987654321)`,
    },
  });
  const handleCopyClick = () => {
    if (textareaRef.current) {
      navigator.clipboard
        .writeText(getValues('address'))
        .then(() => {
          setIsCopied(true);
        })
        .catch((err) => {
          console.error("Unable to copy text to clipboard", err);
        });
    }
  };
  const setPickup = () => {
    setIsDelivery((p) => !p);
  };
  return (
    <div className="w-full">
      <p className="font-bold text-lg my-3 self-start">Customer details</p>
      <div className="flex flex-col w-full p-2 md:p-4">
        <div className="flex justify-between items-center pb-2 md:pb-4">
          <div className="flex flex-col space-y-4">
            <p className="font-bold">始 - 至</p>
            <p className="">2023-03-12 - 2023-05-18</p>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="font-bold">总包裹数量</p>
            <p className="">10 件 - 37527 MMK</p>
          </div>
          <Link to={'/customers/history/'+1} className="w-24 h-20 md:w-24 md:h-24  p-2 bg-slate-600 text-center text-white">
            历史 记录
          </Link>
        </div>
        <div className="grid grid-cols-1 grid-rows-2">
          <div className="grid grid-cols-12">
            <div className="border border-stone-300 col-span-3 p-2 md:p-4 md:col-span-2">
              <p>编号</p>
              <p>订货姓名</p>
              <p>真实姓名</p>
              <p>电话</p>
              <p>城市</p>
              <p>区域</p>
              <p>地址</p>
              <p>所属店</p>
              <p>注册日期</p>
              <p>密码</p>
              <p>Point</p>
            </div>
            <div className="border border-stone-300 col-span-4 p-2 md:p-4 md:col-span-4">
              <p>xh2022</p>
              <p>XH Testing</p>
              <p>XH Testing</p>
              <p>0987654321</p>
              <p>腊戌</p>
              <p>1保</p>
              <p>L5A</p>
              <p>12 保</p>
              <p>2023-03-11</p>
              <p>123</p>
              <p>0</p>
            </div>
            <div className="border border-stone-300 col-span-2 p-2 md:p-4 md:col-span-4">
              0
            </div>
            <div className="border border-stone-300 col-span-3 p-2 md:p-4 md:col-span-2">
              <div
                onClick={setPickup}
                className={`w-14 flex items-center justify-center text-[8px] md:text-base md:w-20 ${
                  isDelivery ? " onButton" : "defaultButton"
                } transition-all`}
              >
                {isDelivery ? (
                  <p>
                    派送
                    <Icon name={"on"} />
                  </p>
                ) : (
                  <p>
                    派送 <Icon name={"off"} />
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="text-center border border-stone-300 border-y-0 flex p-4">
              <MuiTextarea name="address" control={control} label="" placeholder="" rows={4} ref={textareaRef} />
              <div onClick={handleCopyClick} className="border border-stone-300 flex items-center justify-center w-10 h-10 cursor-pointer">
                <Icon name="copy" />
              </div>
            </div>
            {isCopied && <Alert
              onClose={() => {
                setIsCopied(false);
              }}
            >
             Successfully copied to clipboard — check it out!
            </Alert>}
            <div className="border border-stone-300 flex items-center justify-center p-4">
              <Link to='/customers/edit/id' className="defaultButton w-16 text-center">
                <Icon name="edit" color="#fff" fillColor="#fff" />
              </Link>
            </div>
          </div>
        </div>
        <Link to="/customers" className="deleteButton w-16 text-center">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Detail;
