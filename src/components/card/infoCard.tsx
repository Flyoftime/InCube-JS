import React from "react";

// Component for a single card
const InfoCard = ({
  color,
  title,
  value,
}: {
  color: string;
  title: string;
  value: string | number;
}) => {
  return (
    <div className="lg:h-24 h-[80px] lg:mx-[60px] mx-2 shadow-md rounded-lg overflow-hidden">
      <div className="p-2" style={{ backgroundColor: color }}>
        <h3 className="text-white lg:text-base text-sm font-semibold">
          {title}
        </h3>
      </div>
      <p
        className="text-center lg:text-lg text-base font-bold pt-2"
        style={{ color: color }}
      >
        {value}
      </p>
    </div>
  );
};

export default InfoCard;
