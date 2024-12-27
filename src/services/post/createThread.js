import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const createThread = async (botID, userID, threadName) => {
    try {
        const formData = new FormData();
        formData.append('bot_id', botID.toString());
        formData.append('user_id', userID.toString());
        formData.append('name', threadName);

        const res = await axiosInstance.post(API_ROUTES.Thread.createThread, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error creating thread:', error);
        return [];
    }
};
