import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const updateUser = async (id, role, active) => {
  const formData = new FormData();
  formData.append("role", role);
  formData.append("active", active ? "1" : "0");

  const res = await axiosInstance.post(
    API_ROUTES.User.updateUser.replace(":id", id.toString()),
    formData
  );
  return res.data;
};
