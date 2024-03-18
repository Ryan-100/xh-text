import React from "react";
import Progress from "./Progress";
import { Divider } from "@mui/material";

const colors = ["#78C5FC", "#9DE3C0", "#F69C9C"];

const BarGroup = ({ data }) => {
  return (
    <div className="bg-white col-span-1  w-[344px] h-[333px] p-6 flex flex-col justify-center space-y-6 rounded-[20px]">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-medium">{data.name}</p>
        <p className="text-2xl font-medium text-primary">{data?.count}</p>
      </div>
      <div className="space-y-4">
        <Divider />
        {data.data.map((item, i) => (
          <Progress
            key={i}
            color={colors[i]}
            name={item.name}
            progress={item.count}
          />
        ))}
      </div>
    </div>
  );
};

export default BarGroup;
