import { useState } from "react";
import clsx from "clsx";
import { useAuthState } from "../providers/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { removeAuthToken, removeAccessToken } from "../services/common/storage";

import { useTemplateContext } from "../providers/TemplateProvider/TemplateProvider";

import { PAGE_LIST } from "../constants/history";
import { MAIN_PATHS } from "../routes/main";

import { BaseMenuItem } from "./base/BaseMenuItem";

import Heart from "../assets/images/menu/heart.webp";
import History from "../assets/images/menu/history.webp";
import Logout from "../assets/images/menu/logout.webp";
import User from "../assets/images/menu/user.webp";

export function Avatar() {
  const { user } = useAuthState();
  const [params, setParams] = useSearchParams();
  const { setCurrentHistoryListBotIndex, currentBot, setCurrentPage } =
    useTemplateContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const accountMenu = [
    {
      image: User,
      hasBorderBottom: false,
      label: "Tài khoản của tôi",
      onClick: () => {
        navigate(MAIN_PATHS.MyAccount);
      },
      isShow: true,
    },
    {
      image: History,
      hasBorderBottom: false,
      label: "Lịch sử Đoạn Chat",
      onClick: () => {
        setCurrentHistoryListBotIndex(currentBot);
        setCurrentPage(PAGE_LIST["HISTORY_LIST"]);
        setIsOpen(false);
      },
      isShow: true,
    },
    {
      image: Heart,
      hasBorderBottom: true,
      label: "Yêu thích",
      onClick: () => {
        setCurrentHistoryListBotIndex(currentBot);
        setCurrentPage(PAGE_LIST["FAVORITE"]);
        setIsOpen(false);
      },
      isShow: true,
    },
    {
      image: Logout,
      hasBorderBottom: false,
      label: "Đăng xuất",
      onClick: () => {
        removeAuthToken();
        removeAccessToken();
        const token = params.get("token");
        if (token) {
          params.delete("token");
          setParams(params);
        }
        navigate(0);
      },
      isShow: true,
    },
  ];

  return (
    <div className="absolute right-[30px] flex flex-col items-end">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 md:relative md:bg-transparent md:backdrop-blur-none md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <button
        className={clsx({
          "z-30": isOpen,
        })}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {user ? (
          <img
            src={user.profile_photo_url}
            className="w-[42px] h-[42px] rounded-full"
          />
        ) : (
          <div className="w-[42px] h-[42px] rounded-full bg-primary"></div>
        )}
      </button>
      <div
        className={clsx(
          "rounded-xl  flex gap-[18px] flex-col transition-all duration-300 ease-in-out",
          {
            "opacity-100 scale-100 bg-white z-30 p-4 mt-3": isOpen,
            "opacity-0 max-h-0 scale-95 overflow-hidden w-0": !isOpen,
          }
        )}
        style={{ boxShadow: "3px 3px 15px 0px #00000026" }}
      >
        {accountMenu.map((item, index) =>
          item.isShow &&  (
            <BaseMenuItem
              onClick={item.onClick}
              label={item.label}
              image={item.image}
              key={index}
              hasBorderBottom={item.hasBorderBottom}
            />
          )
        )}
      </div>
    </div>
  );
}
