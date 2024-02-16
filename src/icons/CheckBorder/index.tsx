import React from "react";

const CheckBorder: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...rest }) => {
  return (
    <svg
      {...rest}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="7.5"
        fill="white"
        stroke="#FF6604"
      />
    </svg>
  );
};

export default CheckBorder;
