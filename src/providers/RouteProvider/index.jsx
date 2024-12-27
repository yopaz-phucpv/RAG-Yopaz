import { createContext, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoutes, useSearchParams } from "react-router-dom";
import { setAccessToken } from "../../services/common/storage";
import { useAuthState } from "../AuthProvider";
import LoginModal from "../../components/Modal/LoginModal";
import { MainRouter, NavigateToMyPage } from "../../routes/main";
import Alerts from "../../components/base/Alerts";

export const HistoryRouteContext = createContext({});

const IndexRouter = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useAuthState();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const routes = useMemo(() => {
    return [...MainRouter, ...NavigateToMyPage];
  }, [isLoggedIn]);

  return (
    <HistoryRouteContext.Provider value={{}}>
      <Alerts />
      {useRoutes(routes)}
      {!isLoggedIn && <LoginModal />}
    </HistoryRouteContext.Provider>
  );
};

export { IndexRouter };
