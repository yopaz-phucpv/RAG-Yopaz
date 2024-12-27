import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const getThreadListUser = async (id) => {
  const res = await axiosInstance.get(
    API_ROUTES.Thread.getThreadListByUser.replace(":id", id.toString())
  );
  return res.data;
};
