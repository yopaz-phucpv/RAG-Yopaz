import BaseModal from "./BaseModal";
import BaseButton from "../base/BaseButton";
import { API_ROUTES } from "../../services/common/routes";

export default function LoginModal() {
  const handleClick = () => {
    const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    window.location.href = apiBaseUrl + API_ROUTES.Login.getRedirect;
  };
  return (
    <BaseModal>
      <div
        className=" max-w-[24.375rem] bg-white rounded-2xl p-[30px] gap-[15px] text-center flex flex-col"
        style={{ boxShadow: "3px 3px 15px 0px #00000017" }}
      >
        <h2 className="text-2xl font-semibold">Chào mừng trở lại</h2>
        <BaseButton
          onClick={handleClick}
          label={"Đăng nhập "}
          className="bg-black text-white w-full rounded-[1.5rem] py-3"
        />
        <p className="text-base text-center">
          Đăng nhập hoặc đăng ký để nhận phản hồi thông minh hơn, tải lên tệp
          cũng như hình ảnh và nhiều lợi ích khác.
        </p>
      </div>
    </BaseModal>
  );
}
