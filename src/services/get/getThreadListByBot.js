import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const getThreadListByBot = async (id, page) => {
  const res = await axiosInstance.get(
    API_ROUTES.Thread.getThreadListByBot.replace(":id", id.toString()),
    {
      params: {
        page: page,
      },
    }
  );
  return res.data;
};
