import React from "react";

const Progress = ({ name, progress,color }) => {
  return (
    <div className="flex flex-col space-y-2">
      <p className="font-medium text-secondary">{name}</p>
      <div className="flex items-center space-x-4">
        <div className="relative w-[249px] h-[23px] bg-gray-light-1 rounded-[10px] overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${progress}%`,backgroundColor:color }}
          />
        </div>
        <span className="text-gray font-bold">{progress}%</span>
      </div>
    </div>
  );
};

export default Progress;
