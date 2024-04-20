import React from "react";

export default function Loader(props) {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8em"
        height="8em"
        viewBox="0 0 24 24"
        {...props}
        className=""
      >
        <defs>
          <filter id="svgSpinnersGooeyBalls10">
            <feGaussianBlur
              in="SourceGraphic"
              result="y"
              stdDeviation={1.5}
            ></feGaussianBlur>
            <feColorMatrix
              in="y"
              result="z"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
            ></feColorMatrix>
            <feBlend in="SourceGraphic" in2="z"></feBlend>
          </filter>
        </defs>
        <g fill="white" filter="url(#svgSpinnersGooeyBalls10)">
          <circle cx={4} cy={12} r={3}>
            <animate
              attributeName="cx"
              calcMode="spline"
              dur="0.75s"
              keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
              repeatCount="indefinite"
              values="4;9;4"
            ></animate>
            <animate
              attributeName="r"
              calcMode="spline"
              dur="0.75s"
              keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
              repeatCount="indefinite"
              values="3;8;3"
            ></animate>
          </circle>
          <circle cx={15} cy={12} r={8}>
            <animate
              attributeName="cx"
              calcMode="spline"
              dur="0.75s"
              keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
              repeatCount="indefinite"
              values="15;20;15"
            ></animate>
            <animate
              attributeName="r"
              calcMode="spline"
              dur="0.75s"
              keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
              repeatCount="indefinite"
              values="8;3;8"
            ></animate>
          </circle>
        </g>
      </svg>
    </div>
  );
}
