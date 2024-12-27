import { useDispatch } from "react-redux";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"

import { addError } from "../app/slices/modalSlice";

import { queryClient } from "../providers/QueryProvider";
import { updateThread } from "../services/post/updateThread";
import { getUserList } from "../services/get/getUserList";
import { updateUser } from "../services/post/updateUser";
import { getUserInfo } from "../services/get/getUserInfo";

export const useGetUserList = (page) => {
  const users = useQuery({
    queryKey: ["userList", page],
    queryFn: () => getUserList(page),
    initialData: () => {
      return queryClient.getQueryData(["userList", page]);
    },
    retry: false
  });
  return users;
};

export const useUpdateUser = (page) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role, active }) =>
      updateUser(id, role, active),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList", page] });
      dispatch(addError({message:"Bạn đã cập nhật người dùng thành công" , status: 200}))
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
};

export const useUpdateThread = () => {
  return useMutation({
    mutationFn: ({
      threadID,
      threadName,
      isFavorite,
    }) =>
      updateThread(threadID, threadName, isFavorite),
    onError: (error) => {
      console.error("Error creating thread:", error);
    },
  });
};

export const useDeleteRole = (id) => {
  const threads = useQuery({
    queryKey: ["deleteRole"],
    queryFn: () => deleteRole(id),
  });
  return threads;
};

export const useGetMy = () => {
  const user = useQuery({
    queryKey: ["my"],
    queryFn: () => getUserInfo(),
  });
  return user;
};
