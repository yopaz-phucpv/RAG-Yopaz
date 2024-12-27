import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { MAIN_PATHS } from "../../routes/main";
import { useGetMyBots } from "../../hooks/botHooks";
import { useAuthState } from "../../providers/AuthProvider";
import { useCreateThread } from "../../hooks/threadHooks";
import { useHandleThread } from "../../hooks/handleHooks";
import { PAGE_LIST } from "../../constants/history";

const TemplateContext = createContext(
  undefined
);

export function useTemplateContext() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error(
      "useTemplateContext must be used within a TemplateProvider"
    );
  }
  return context;
}

export function TemplateProvider ({ children }) {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const {
    data: newThread,
    mutate: createThread,
    isPending: isCreating,
    isSuccess: isSuccessCreating,
  } = useCreateThread();
  const {
    data: threadResponse,
    mutate: sendQuestion,
    isPending,
  } = useHandleThread();
  const { data: botList = [], isLoading: isLoadingBot } = useGetMyBots();
  const [isDisabledTextArea, setIsDisabledTextArea] = useState(false);
  const [currentBot, setCurrentBot] = useState(null);
  const [currentHistoryListBotIndex, setCurrentHistoryListBotIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(PAGE_LIST["HISTORY_LIST"]);
  const [imageInput, setImageInput] = useState(null);
  const [question, setQuestion] = useState("");
  const [isNewCreate, setIsNewCreate] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    setIsDisabledTextArea(isLoadingBot);
    if (!currentBot && !isLoadingBot && botList.length > 0) {
      setCurrentBot(botList[0].id);
    }
  }, [isLoadingBot, botList, currentBot]);

  const handleSubmit = (id) => {
    if (id) {
      setIsNewCreate(false);
      sendQuestion({
        botID: currentBot,
        userID: user.id,
        threadID: id,
        question: question,
        image: imageInput,
      });
      setPreviewUrl(imageInput ? URL.createObjectURL(imageInput) : "");
      setCurrentQuestion(question);
      setQuestion("");
      setImageInput(null);
    } else {
      createThread({
        botID: currentBot,
        userID: user.id,
        threadName: "newThread",
      });
      setIsNewCreate(true);
    }
  };

  useEffect(() => {
    if (isSuccessCreating) {
      navigate(MAIN_PATHS.ChatDetail.replace(":id", newThread.id));
      sendQuestion({
        botID: currentBot,
        userID: user.id,
        threadID: Number(newThread.id),
        question: question,
        image: imageInput,
      });
      setPreviewUrl(imageInput ? URL.createObjectURL(imageInput) : "");
      setCurrentQuestion(question);
      setQuestion("");
      setImageInput(null);
    }
  }, [isSuccessCreating]);

  useEffect(() => {
    setIsDisabledTextArea(isCreating);
  }, [isCreating]);

  return (
    <TemplateContext.Provider
      value={{
        previewUrl,
        setPreviewUrl,
        currentQuestion,
        setCurrentQuestion,
        setIsDisabledTextArea,
        createThread,
        isDisabledTextArea,
        currentBot,
        setCurrentBot,
        botList,
        isLoadingBot,
        currentHistoryListBotIndex,
        setCurrentHistoryListBotIndex,
        currentPage,
        setCurrentPage,
        imageInput,
        setImageInput,
        question,
        setQuestion,
        handleSubmit,
        isNewCreate,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
