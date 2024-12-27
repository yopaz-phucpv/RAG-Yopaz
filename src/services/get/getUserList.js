import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const getUserList = async (page) => {
  const res = await axiosInstance.get(API_ROUTES.User.getUserList, {
    params: {
      page: page,
    },
  });
  return res.data;
};
