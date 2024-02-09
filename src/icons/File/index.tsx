import React, { SVGProps } from "react";

const File = ({
  color,
  width = "1em",
  height = "1em",
}: SVGProps<HTMLOrSVGElement>) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        color={color}
        height={height}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m6 19l3-3.86l2.14 2.58l3-3.86L18 19H6M6 4h5v8l-2.5-1.5L6 12M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"
        ></path>
      </svg>
    </div>
  );
};

export default File;
