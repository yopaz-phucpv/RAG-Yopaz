import { useState } from "react";
import clsx from "clsx";

import Phone from "../../assets/images/menu/phone.webp";
import Check from "../../assets/images/services/check.webp";
import Dropdown from "../../assets/images/homepage/arrow-down.webp";

const BaseIcon = () => {
  return (
    <div className="w-[1.875rem] h-[1.875rem] bg-primary flex items-center justify-center rounded-full">
      <img src={Phone} className="w-auto" />
    </div>
  );
};

export const BaseDropdown = ({
  width = "w-[98px]",
  background = "bg-primary",
  height = "h-[40px]",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected] = useState("YopazAI");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <button
        onClick={toggleDropdown}
        className={clsx(
          width,
          background,
          height,
          "flex rounded-md text-base font-normal items-center justify-center gap-3 absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none",
          { "z-30": isOpen }
        )}
      >
        <span>{selected}</span>
        <img src={Dropdown} alt="Dropdown Icon" />
      </button>

      <div
        className={clsx(
          "rounded-xl flex flex-col gap-[15px] max-w-[22.5rem] min-w-60 transition-all duration-300 ease-in-out absolute left-1/2 transform -translate-x-1/2 md:relative md:top-0 md:left-0 md:transform-none top-[72px]",
          {
            "opacity-100 max-h-[367px] bg-white p-[15px] mt-3 z-30": isOpen,
            "opacity-0 max-h-0 overflow-hidden w-0 z-0": !isOpen,
          }
        )}
        style={{
          boxShadow: "3px 3px 15px 0px #00000026",
        }}
      >
        <div className="rounded-md p-3 bg-gray-2 flex flex-col gap-[15px]">
          <div className="flex gap-3 items-center">
            <BaseIcon />
            <div className="flex flex-col justify-start items-start w-[calc(100%-30px)]">
              <h4 className="text-sm text-left">YopazAI Plus</h4>
              <p className="text-pale-gray text-left text-xs font-roboto">
                Sử dụng mô hình thông minh nhất của chúng tôi và nhiều tính năng
                khác
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center p-3 gap-3 border-b border-black-translucent pb-[27px] w-full">
          <BaseIcon />
          <div className="flex flex-col flex-grow">
            <h4 className="text-left">YopazAI</h4>
            <p className="font-roboto text-xs tracking-wide text-pale-gray">
              Tuyệt vời cho công việc hàng ngày
            </p>
          </div>
          <img src={Check} className="w-4" alt="Check Icon" />
        </div>
        <div className="flex items-center p-3 gap-3">
          <BaseIcon />
          <h4 className="text-left flex-grow">Doạn Chat Tạm thời</h4>
          <img src={Check} className="w-4" alt="Check Icon" />
        </div>
      </div>
    </div>
  );
};
