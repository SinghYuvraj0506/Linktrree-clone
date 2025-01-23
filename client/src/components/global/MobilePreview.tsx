import React from "react";
import mobileScreen from "@/assets/images/screen.png";

const MobilePreview = () => {
  return (
    <div className="flex items-center justify-center relative rounded-[55px] overflow-hidden">
      <img src={mobileScreen} alt="" className="w-full" />

      {/* Main Content */}
      <div className="flex-1 w-full px-2 box-border h-[90%] absolute left-0 bottom-2 overflow-hidden">
        <div className="w-full h-full bg-white rounded-b-[55px] overflow-y-auto">
            <img src="https://miro.medium.com/v2/resize:fit:360/0*dXiPKy0pwy8cm5Q9.png" alt="" className="w-full h-full object-cover"/>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
