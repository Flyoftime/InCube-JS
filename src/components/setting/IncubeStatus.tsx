// InCubeStatus.tsx
import React from "react";

type InCubeStatusProps = {
  title: string;
  value: number;
};

const InCubeStatus: React.FC<InCubeStatusProps> = ({ title, value }) => {
  return (
    <div className="rounded-lg shadow-lg lg:px-[100px] px-[80px] py-5 bg-white text-center text-black w-full lg:w-auto">
      <p className="font-semibold">InCube Active</p>
      <h2 className="lg:text-2xl text-lg font-bold">
        {value} {title}
      </h2>
    </div>
  );
};

export default InCubeStatus;
