import { io } from 'socket.io-client';
import { getAccessToken } from './services/common/storage';
const URL = import.meta.env.VITE_APP_SOCKET_BASE_URL;
const accessToken = getAccessToken()

export const socket = io(URL, {
    auth: {
        token: accessToken
    }
});