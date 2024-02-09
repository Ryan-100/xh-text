import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  AccountBalanceWalletOutlined,
  MonetizationOnOutlined,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";

const Widget = ({type}) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch(type) {
      case "admin":
          data={
              title:"ADMINS",
              isMoney: false,
              link: "See all admins",
              icon: <PersonOutlineIcon className='icon' style={{color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)"}} />
          }
          break;
      case "order":
          data={
              title:"ORDERS",
              isMoney: false,
              link: "View all orders",
              icon: <ShoppingCartCheckoutOutlined className='icon'
              style={{color: "goldenrod", backgroundColor: "rgba(218, 165, 32, 0.2)"}} />
          }
          break;
      case "earning":
          data={
              title:"EARNINGS",
              isMoney: true,
              link: "View net earnings",
              icon: <MonetizationOnOutlined className='icon'
              style={{color: "green", backgroundColor: "rgba(0, 128, 0, 0.2)"}} />
          }
          break;
    
      default:
          break;
  }

  return (
    <div className="w-full h-auto p-4 rounded-md bg-white drop-shadow-xl flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <p className="uppercase text-[gray] font-bold text-base">{data.title}</p> 

        {data.icon}
      </div>
      <p className="text-3xl">{data.isMoney && "$"}{amount}</p>
      <div className="flex items-center justify-between">
        <p className="underline text-xs">{data.link}</p>
      </div>
    </div>
  );
};

export default Widget;
