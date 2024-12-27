import { memo } from "react";
import { useNavigate } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache
} from "@tanstack/react-query";

import store from "../../app/store";
import { addError } from "../../app/slices/modalSlice";

import { MAIN_PATHS } from "../../routes/main";


let reduxDispatch;
let globalNavigate;

const setReduxDispatch = (dispatch) => {
  reduxDispatch = dispatch;
};

const setNavigate = (navigate) => {
  globalNavigate = navigate;
};

const defaultOptions = {
  queries: {},
  mutations: {},
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.status === 403 && reduxDispatch && globalNavigate) {
        globalNavigate(MAIN_PATHS.HomePage); 
      } else {
        reduxDispatch(addError({status: error.status,message: error.message || error.statusText || "Unknown error"}));
      }
    },
  }),
  defaultOptions,
});

const QueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <SetDispatch /> 
    <SetNavigate />
  </QueryClientProvider>
);

const SetDispatch = () => {
  const dispatch = store.dispatch;
  setReduxDispatch(dispatch);
  return null;
};

const SetNavigate = () => {
  const navigate = useNavigate();
  setNavigate(navigate);
  return null;
};

export { queryClient };
export default memo(QueryProvider);
