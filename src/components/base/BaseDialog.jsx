import { useState, useEffect, useRef, memo } from "react";
import { socket } from "../../socket";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { useTemplateContext } from "../../providers/TemplateProvider/TemplateProvider";
import { useGetUserHistory } from "../../hooks/threadHooks";

import LoadingIcon from "../../assets/images/homepage/loading.png";
import Copy from "../../assets/images/dialog/copy.webp";
import ThumbDown from "../../assets/images/dialog/thumb_down.webp";
import ThumbUp from "../../assets/images/dialog/thumb_up.webp";
import ArrowDown from "../../assets/images/arrow-down.png";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const customComponents = {
  table: ({ node, ...props }) => (
    <table {...props} className="w-full border border-black text-black" />
  ),
  th: ({ node, ...props }) => (
    <th
      {...props}
      className="border border-black px-4 py-2 bg-black text-white uppercase"
    />
  ),
  td: ({ node, ...props }) => (
    <td {...props} className="border border-black px-4 py-2" />
  ),
  tr: ({ node, ...props }) => (
    <tr
      {...props}
      className="odd:bg-white even:bg-gray-100 hover:bg-gray-300"
    />
  ),

  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export const MemoizedReactMarkdown = memo(({ children }) => {

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw]}
      components={customComponents}
    >
      {children}
    </ReactMarkdown>
  );
});

export const Dialog = ({ question, answer, isTyping, image, isTemp }) => {
  const imageBase = import.meta.env.VITE_APP_BASE_URL;
  const url = isTemp ? image : imageBase + image;

  return (
    <div className="w-full flex flex-col gap-[30px] px-3">
      <div className="ml-auto md:max-w-[70%] w-fit">
        {image && (
          <img src={url} alt="User upload" className="ml-auto h-40 w-auto mx-auto mb-2" />
        )}
        <p className="rounded-[27px] px-6 py-3 bg-[#F4F4F4] ml-auto text-center w-fit">
          {question}
        </p>
      </div>
      <MemoizedReactMarkdown>
        {answer || ''}
      </MemoizedReactMarkdown>

      {!isTyping && answer && (
        <div className="flex gap-[35px] items-center">
          <img src={Copy} className="w-4 h-4 cursor-pointer" alt="Copy" />
          <img src={ThumbDown} className="w-4 h-4 cursor-pointer" alt="ThumbDown" />
          <img src={ThumbUp} className="w-4 h-4 cursor-pointer" alt="ThumbUp" />
        </div>
      )}
    </div>
  );
};

function BaseDialog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentQuestion,
    imageInput,
    previewUrl,
    setPreviewUrl,
  } = useTemplateContext();
  const {
    data: threadDetail,
    isPending: isLoadingHistory,
    isError,
    error,
  } = useGetUserHistory(Number(id));

  const [currentShowQuestion, setCurrentShowQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  const [modifiedThreadDetail, setModifiedThreadDetail] = useState(null);

  const dialogContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const typingQueue = useRef("");
  const isTyping = useRef(false);

  const scrollToBottom = () => {
    if (dialogContainerRef.current) {
      dialogContainerRef.current.scrollTo({
        top: dialogContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (!dialogContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      dialogContainerRef.current;
    setIsAtBottom(scrollHeight - (scrollTop + clientHeight) < 10);
  };

  useEffect(() => {
    if (dialogContainerRef.current) {
      dialogContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (dialogContainerRef.current) {
        dialogContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (isError && error?.status === 404) {
      navigate("/");
    }
  }, [isError, error, navigate]);
  useEffect(() => {
    if (threadDetail) {
      const copiedData = {
        ...threadDetail,
        user_histories: [...(threadDetail.user_histories || [])],
      };
      setModifiedThreadDetail(copiedData);
    }
  }, [threadDetail]);

  useEffect(() => {
    if (!isLoadingHistory && modifiedThreadDetail?.user_histories?.length) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isLoadingHistory, modifiedThreadDetail?.user_histories]);

  useEffect(() => {
    setCurrentShowQuestion(currentQuestion);

    if (currentQuestion) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [currentQuestion]);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onDisconnect() {
      console.log("disconnected");
    }
    function onMessages(value) {
      if (value?.answer) {
        setCurrentAnswer(pre => pre + value.answer)
        setIsTypingFinished(false);
      }
      if (value?.end) {
        setIsTypingFinished(true)
      }
    }
    function onError(value) {
      console.log("Socket error:", value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("answer", onMessages);
    socket.on("connect_error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("answer", onMessages);
      socket.off("connect_error", onError);
    };
  }, []);

  useEffect(() => {
    if (isTypingFinished) {
      setModifiedThreadDetail((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          user_histories: [
            ...prev.user_histories,
            {
              id: Date.now(),
              question: currentQuestion,
              answer: currentAnswer,
              image_path: previewUrl,
              isTemp: true,
            },
          ],
        };
      });

      setCurrentAnswer("");
      setPreviewUrl(null);
      setIsTypingFinished(false);
      setCurrentShowQuestion("");
    }
  }, [
    isTypingFinished,
    currentAnswer,
    currentQuestion,
    previewUrl,
    setPreviewUrl,
  ]);

  return (
    <>
      <div className="flex-grow w-full max-w-[792px] mx-auto z-10">
        <div
          className={clsx(
            imageInput
              ? "max-h-[calc(100dvh-300px)]"
              : "max-h-[calc(100dvh-240px)]",
            "flex flex-col gap-[30px] h-fit overflow-y-auto"
          )}
          ref={dialogContainerRef}
        >
          {isLoadingHistory ? (
            <img src={LoadingIcon} className="w-12 h-12 animate-spin" />
          ) : (
            <>
              {modifiedThreadDetail?.user_histories?.map((item) => (
                <Dialog
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  isTyping={false}
                  image={item.image_path}
                  isTemp={item.isTemp}
                />
              ))}
            </>
          )}
          {currentShowQuestion?.length > 0 && (
            <Dialog
              question={currentShowQuestion}
              answer={currentAnswer}
              isTyping={isTyping.current}
              image={previewUrl}
              isTemp={true}
            />
          )}
          <div className="h-6" />
        </div>

        {!isAtBottom && (
          <img
            src={ArrowDown}
            className="w-6 fixed top-[calc(100dvh-200px)] z-[100] left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToBottom}
            alt="Scroll to bottom"
          />
        )}
      </div>
    </>
  );
}

export default BaseDialog;
