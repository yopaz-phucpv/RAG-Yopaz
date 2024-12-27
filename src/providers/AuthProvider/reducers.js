import { authActionTypes } from "./actionTypes";
import { queryClient } from "../QueryProvider";

import { removeAccessToken, removeAuthToken } from "../../services/common/storage";

const syncStateToLocalStorage = (state) => {
  localStorage.setItem("auth", JSON.stringify(state));
  return state;
};

const authReducer = (state, { type, payload } ) => {
  switch (type) {
    case authActionTypes.LOGOUT_USER:
      queryClient.clear();
      removeAccessToken();
      removeAuthToken();
      return;
    case authActionTypes.LOGIN_USER:
      window.dispatchEvent(new Event("storage"));
      return syncStateToLocalStorage({
        user: payload.user,
        user_detail: payload.user_detail,
        isLoggedIn: true,
      });
    default:
      return syncStateToLocalStorage(state);
  }
};

export { authReducer };
