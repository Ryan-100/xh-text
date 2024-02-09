import React, { SVGProps } from "react";

const Send = ({
    color,
    width = "1em",
    height = "1em",
  }: SVGProps<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      color={color}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.838t.95-.087l15.4 6.5q.625.275.625.925t-.625.925l-15.4 6.5Z"
      ></path>
    </svg>
  );
};

export default Send;
