import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { queryClient } from "../providers/QueryProvider";
import { getMyBot } from "../services/get/getMyBot";
import { createBot } from "../services/post/createBot";
import { editBot } from "../services/post/updateBot";
import { deleteBot } from "../services/delete/deleteBot";

import { useAuthState } from "../providers/AuthProvider";

export const useGetBots = (page) => {
  return useQuery({
    queryKey: ["bots", page],
    queryFn: () => getBots(page),
    placeholderData: keepPreviousData,
    
  });
};

export const useGetMyBots = () => {
  const { user } = useAuthState();
  return useQuery({
    queryKey: ["myBots"],
    queryFn: () => getMyBot(),
    initialData: () => queryClient.getQueryData(["myBots"]),
    retry: false,
    enabled: !!user,
  });
};

export const useCreateBot = (currentPage) => {
  return useMutation({
    mutationFn: ({ name, description, bot_url, bot_key, flag }) =>
      createBot(name, description, bot_url, bot_key, flag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots", currentPage] });
    },
  });
};

export const useEditBot = (currentPage) => {
  return useMutation({
    mutationFn: ({ id, name, description, bot_url, bot_key, flag }) =>
      id
        ? editBot(id, name, description, bot_url, bot_key, flag)
        : createBot(name, description, bot_url, bot_key, flag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots", currentPage] });
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useDeleteBot = (
  currentPage,
  setCurrentPage
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (variables) => deleteBot(variables.botId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots", currentPage] });
      const botsOnPage = queryClient.getQueryData(["bots", currentPage]);
      if (botsOnPage && botsOnPage.data.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
        queryClient.prefetchQuery({ queryKey: ["bots", currentPage - 1] });
      }
    },
  });

  return mutation;
};
