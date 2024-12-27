import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";
export const updateThread = async (
  threadID,
  threadName,
  isFavorite
) => {
  const formData = new FormData();
  formData.append("name", threadName);
  formData.append("favorite", isFavorite ? "1" : "0");

  const res = await axiosInstance.post(
    API_ROUTES.Thread.updateThread.replace(":id", String(threadID)),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
