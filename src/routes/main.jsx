import { Navigate } from "react-router-dom";

import Homepage from "../pages/Homepage";
import AccountInfo from "../pages/AccountInfo";
import ThreadDetail from "../pages/ThreadDetail";

const MAIN_PATHS = {
  HomePage: "/",
  MyAccount: "/my_account",
  ChatDetail: "/chat/:id",
};

const MainRouter = [
  {
    path: MAIN_PATHS.HomePage,
    element: <Homepage />,
  },
  {
    path: MAIN_PATHS.MyAccount,
    element: <AccountInfo />,
  },
  {
    path: MAIN_PATHS.ChatDetail,
    element: <ThreadDetail/>
  },
];

const NavigateToMyPage = [
  { path: "*", element: <Navigate to={MAIN_PATHS.HomePage} /> },
];

export { MainRouter, NavigateToMyPage, MAIN_PATHS };
