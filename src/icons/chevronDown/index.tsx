import React, { SVGProps } from "react";

const ChevronDown = ({
  width = "24",
  height = "24",
}: SVGProps<HTMLOrSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_546_58977"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <rect
          y="32"
          width="32"
          height="32"
          transform="rotate(-90 0 32)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_546_58977)">
        <path
          d="M15.2385 22.1009L5.64818 12.5074C5.22829 12.0865 5.22829 11.4044 5.64818 10.9824C6.06807 10.5615 6.75009 10.5615 7.16998 10.9824L15.9994 19.815L24.8287 10.9835C25.2486 10.5625 25.9306 10.5625 26.3516 10.9835C26.7715 11.4044 26.7715 12.0875 26.3516 12.5085L16.7614 22.102C16.3458 22.5165 15.6531 22.5165 15.2385 22.1009Z"
          fill="#868686"
          stroke="#868686"
          stroke-width="2"
        />
      </g>
    </svg>
  );
};

export default ChevronDown;
