import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuthState } from "../providers/AuthProvider";

import SimpleTemplate from "../template/SimpleTemplate";
import BaseInput from "../components/base/BaseInput";
import BaseButton from "../components/base/BaseButton";

import Info from '../assets/images/account/Info.webp'

import { MAIN_PATHS } from "../routes/main";

export default function AccountInfo() {
  const { user, user_detail } = useAuthState();

  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const { logout } = useAuthState();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    if (!user || !user_detail) {
      navigate(MAIN_PATHS.HomePage);
      logout();
    }
  }, [user, user_detail]);
  return (
    <SimpleTemplate>
      <div className="flex flex-col gap-[30px] w-80 mx-auto">
        <h1 className="mx-auto font-bold text-[3rem]">Tài khoản</h1>
        <div className="border border-dark-gray px-[15px] py-[30px] rounded-lg flex flex-col gap-[30px] w-full">
          <BaseInput
            name={'name'}
            value={name}
            label={"Họ tên"}
            onChange={handleNameChange}
            isDisabled={true}
            type="text"
          />
          <BaseInput
            name={'email'}
            value={email}
            label={"Email"}
            onChange={handleEmailChange}
            isDisabled={true}
            type="text"
          />
          <div>
            <p className="text-base mb-2">Ảnh đại diện</p>
            {user ? (
              <img
                src={user.profile_photo_url}
                className="w-2/3 aspect-square mx-auto"
              />
            ) : (
              <div className="w-2/3 aspect-square bg-dark-gray mx-auto" />
            )}
          </div>
          <h3
            className={clsx(
              user_detail.remain_token > 100000 ? "text-2xl" : "text-xl",
              "text-center"
            )}
          >
            Còn lại:{" "}
            <span className="font-semibold">
              {user_detail.remain_token} TOKENS
            </span>
          </h3>
          <BaseButton label={"Gia hạn"} />
        </div>
      </div>
    </SimpleTemplate>
  );
}
