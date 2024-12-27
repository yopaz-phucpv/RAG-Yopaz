import {
  useMutation
} from "@tanstack/react-query";
import { handleThread } from "../services/post/handleThread";
import { useDispatch } from "react-redux";
import { addError } from "../app/slices/modalSlice";
import { useNavigate } from "react-router-dom";
import { MAIN_PATHS } from "../routes/main";

export function useHandleThread(
  options
) {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({ botID, userID, threadID, question, image }) =>  handleThread(botID, userID, threadID, question, image),
    onError: (error, variables, context) => {
      if(error.data.error = 'Not enough token') {
        dispatch(addError({status: error.status, message: 'Bạn không có đủ token'}))
      }
      else {
        dispatch(addError({status: error.status, message: error.data.error}))
      }
      
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
}
