import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const editBot = async (
  id,
  name,
  description,
  bot_url,
  bot_key,
  flag
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("bot_url", bot_url);
  formData.append("bot_key", bot_key);
  formData.append("flag", flag ? "1" : "0");

  const res = await axiosInstance.post(API_ROUTES.Bot.editBot.replace(':id', id.toString()), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
