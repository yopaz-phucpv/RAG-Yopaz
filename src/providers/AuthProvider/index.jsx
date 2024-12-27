import {
  useState,
  ReactNode,
  useReducer,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { authInitState } from "./initState";
import { authReducer } from "./reducers";
import { getAccessToken } from "../../services/common/storage";
import { authActionTypes } from "./actionTypes";
import { getUserInfo } from "../../services/get/getUserInfo";
import { removeAccessToken } from "../../services/common/storage";
import { addError } from "../../app/slices/modalSlice";

const AuthContext = createContext(authInitState);

function useAuthState() {
  const { authDispatch, ...authState } = useContext(AuthContext);

  return authState;
}

function useAuthDispatch() {
  const { authDispatch } = useContext(AuthContext);

  return authDispatch;
}

export default function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, authInitState);
  const dispatch = useDispatch();
  const checkLoginByAccessToken = useCallback(async () => {
    try {
      const token = getAccessToken();

      if (!token) {
        return authDispatch({ type: authActionTypes.LOGOUT_USER });
      }

      const res = await getUserInfo();
      if (!res || !res.user.active) {
        authDispatch({ type: authActionTypes.LOGOUT_USER });
      } else {
        authDispatch({ type: authActionTypes.LOGIN_USER, payload: res });
      }
    } catch (e) {
      authDispatch({ type: authActionTypes.LOGOUT_USER });
    }
  }, []);

  const logout = useCallback(() => {
    try {
      removeAccessToken();
      authDispatch({ type: authActionTypes.LOGOUT_USER });
    } catch (e) {
      dispatch(
        addError({
          status: 500,
          message: "Lỗi khi đăng xuất",
        })
      );
    }
  }, [authDispatch, dispatch]);

  useEffect(() => {
    checkLoginByAccessToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{ ...authState, authDispatch: authDispatch, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuthState, useAuthDispatch, authActionTypes };
