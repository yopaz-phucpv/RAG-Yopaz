import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const createPayment = async (id) => {
  const formData = new FormData();
  formData.append("role_id", id.toString());

  const res = await axiosInstance.post(API_ROUTES.Payment.create, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
