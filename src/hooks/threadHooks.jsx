import {
  useQueryClient,
  useQuery,
  useMutation,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { queryClient } from "../providers/QueryProvider";
import { getThreadList } from "../services/get/getThreadList";
import { getThreadListByBot } from "../services/get/getThreadListByBot";
import { getUserHistory } from "../services/get/getUserHistory";
import { createThread } from "../services/post/createThread";
import { updateThread } from "../services/post/updateThread";

export const useGetThreadList = () => {
  const threads = useQuery({
    queryKey: ["threadList"],
    queryFn: () => getThreadList(),
    initialData: () => {
      return queryClient.getQueryData(["threadList"]);
    },
  });
  return threads;
};

export const useGetThreadListByBot = (id) => {
  const threads = useInfiniteQuery({
    queryKey: ["threadListByBot", id],
    queryFn: ({ pageParam = 1 }) =>
      id
        ? getThreadListByBot(id, pageParam)
        : Promise.resolve({
            current_page: 1,
            data: [],
            first_page_url: "",
            from: 0,
            last_page: 1,
            last_page_url: "",
            links: [],
            next_page_url: null,
            path: "",
            per_page: 10,
            prev_page_url: null,
            to: 0,
            total: 0,
          }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.next_page_url ? lastPage.current_page + 1 : undefined;
    },
    enabled: !!id,
  });

  return threads;
};

export const useGetUserHistory = (id) => {
  return useQuery({
    queryKey: ["threadListByUser", id],
    queryFn: () => id && getUserHistory(id),
    enabled: !!id,
    retry: false,
  });
};

export const useCreateThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ botID, userID, threadName }) =>
      createThread(botID, userID, threadName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threadList"] });
    },
    onError: (error) => {
      console.error("Error creating thread:", error);
    },
  });
};

export const useUpdateThread = () => {
  return useMutation({
    mutationFn: ({ threadID, threadName, isFavorite }) =>
      updateThread(threadID, threadName, isFavorite),
    onError: (error) => {
      console.error("Error creating thread:", error);
    },
  });
};

export const useDeleteThread = (id) => {
  const threads = useQuery({
    queryKey: ["deleteThread"],
    queryFn: () => deleteThread(id),
  });
  return threads;
};
