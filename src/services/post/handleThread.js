import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";


export const handleThread = async (
) => {
  const formData = new FormData();
  formData.append("bot_id", botID.toString());
  formData.append("user_id", userID.toString());
  formData.append("thread_id", threadID.toString());
  formData.append("question", question);

  if (image) {
    formData.append("image", image);
  }

  const response = await axiosInstance.post(
    API_ROUTES.Handle.getAnswer,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
