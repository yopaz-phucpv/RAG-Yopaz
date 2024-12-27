import { useEffect, useState, useRef, Fragment } from "react";
import { useDispatch } from "react-redux";
import { addError } from "../../app/slices/modalSlice";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useGetThreadListByBot } from "../../hooks/threadHooks";
import { useUpdateThread } from "../../hooks/userHooks";

import { formatDate } from "../../utils/textFormater";
import { useAuthState } from "../../providers/AuthProvider";
import { useTemplateContext } from "../../providers/TemplateProvider/TemplateProvider";

import { PAGE_LIST } from "../../constants/history";
import { MAIN_PATHS } from "../../routes/main";

import BaseModal from "./BaseModal";
import BaseButton from "../base/BaseButton";

import LoadingIcon from "../../assets/images/homepage/loading.png";
import ArrowBack from "../../assets/images/payment/arrow-back.webp";
import Heart from "../../assets/images/menu/heart.webp";
import More from "../../assets/images/history/more.webp";
import Edit from "../../assets/images/history/edit.webp";
import FilledHeart from "../../assets/images/history/heart_filled.webp";

const HistoryDetail= ({
  id,
  token,
  date,
  title,
  favorite,
  currentPage,
  setCurrentHistoryListBotIndex,
  setCurrentPage,
  updateLike,
  updateTitle,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(title);
  const { mutateAsync: updateThread } = useUpdateThread();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const handleGoToChat = () => {
    setCurrentHistoryListBotIndex(null);
    navigate(MAIN_PATHS.ChatDetail.replace(":id", id.toString()));
    setCurrentPage(PAGE_LIST["HISTORY_LIST"]);
  };

  const onUpdate = async () => {
    try {
      await updateThread({
        threadID: id,
        isFavorite: !favorite,
        threadName: input,
      });
      updateTitle(id, input);
      setIsEditing((prev) => !prev);
      dispatch(
        addError({ status: 200, message: "Bạn đã cập nhật thành công" })
      );
    } catch (e) {
      dispatch(addError({ status: 400, message: "Bạn đã cập nhật thất bại" }));
    }
  };

  const onEdit = () => {
    setIsEditing((prev) => !prev);
    setIsOpen((prev) => !prev);
  };

  const onLike = async () => {
    try {
      await updateThread({
        threadID: id,
        isFavorite: !favorite,
        threadName: title,
      });
      updateLike(id);
      setIsOpen((prev) => !prev);
      dispatch(
        addError({ status: 200, message: "Bạn đã cập nhật thành công" })
      );
    } catch (e) {
      dispatch(addError({ status: 400, message: "Bạn đã cập nhật thất bại" }));
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="px-[9px] gap-[6px] border-b border-black-translucent w-full py-3 flex items-centers md:gap-3">
      {/* Content Section */}
      <div className="flex flex-col w-full md:max-w-[16.125rem] justify-between">
        {currentPage === PAGE_LIST["HISTORY_DETAIL"] && (
          <div className="flex justify-between pb-[6px] md:hidden">
            <p className="font-semibold text-sm">{token} TOKEN</p>
            <p className="text-pale-gray text-xs text-roboto">
              {formatDate(date)}
            </p>
          </div>
        )}

        <div className="flex w-full justify-between text-xs text-pale-gray">
          <p className="text-roboto leading-4">AI Content</p>
          {currentPage !== PAGE_LIST["HISTORY_DETAIL"] && (
            <p className="md:hidden">{formatDate(date)}</p>
          )}
        </div>

        <div className="flex items-center justify-between w-full">

          {isEditing ? (
            <div className="w-full max-w-[16.125rem] flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-[236px] border border-black-translucent rounded-lg h-5 text-xs px-3"
              />
              <button onClick={onUpdate}>
                <img src={Edit} className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center w-full justify-between max-w-[16.125rem] gap-3 cursor-pointer">
              <p
                className="text-sm font-inter w-full max-w-[236px] truncate"
                onClick={handleGoToChat}
              >
                {title}
              </p>
              {Boolean(favorite) && (
                <img src={FilledHeart} alt="Heart icon" className="w-4 h-4" />
              )}
            </div>
          )}

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="block md:hidden"
          >
            <img src={More} />
          </button>
        </div>
      </div>
      <div className="hidden md:flex flex-row md:flex-col justify-between items-end flex-grow md:justify-center">
        {currentPage ? (
          <>
            <p className="text-xs text-pale-gray">{formatDate(date)}</p>
            <div className="flex flex-row md:flex-row-reverse text-sm font-semibold md:justify-end gap-1">
              <p>Token</p>
              <p>{token}</p>
            </div>
          </>
        ) : (
          <p className="text-xs text-pale-gray">{formatDate(date)}</p>
        )}
      </div>
      <BaseButton
        onClick={handleGoToChat}
        className="rounded-md px-3 py-2 bg-[#E3E2E2] text-black text-xs md:block hidden"
        label={"Tiếp tục đoạn chat"}
      />
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="hidden md:block"
      >
        <img src={More} />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-[15%] flex flex-col rounded-md overflow-hidden text-sm"
          style={{
            boxShadow: "3px 3px 15px 0px #00000017",
          }}
        >
          <button
            className="flex p-[0.375rem] gap-[0.375rem] bg-white items-center cursor-pointer"
            onClick={onEdit}
          >
            <img src={Edit} className="w-4 h-4" />
            <p>Đổi tên</p>
          </button>
          <button
            className="flex p-[0.375rem] gap-[0.375rem] bg-[#EDEDED] items-center cursor-pointer"
            onClick={onLike}
          >
            <img src={Heart} className="w-4 h-4" />
            <p>Yêu thích</p>
          </button>
        </div>
      )}
    </div>
  );
};

const HistoryHeader = ({
  month,
  currentPage,
  onClick,
}) =>{ 
  const { user_detail } = useAuthState();
  return (
  <div
    className={clsx(
      currentPage === PAGE_LIST["HISTORY_DETAIL"]
        ? "items-start md:items-center"
        : "items-center",
      "flex flex-row justify-between border-b border-black-translucent w-full pb-[6px]"
    )}
  >
    <h3 className="font-semibold text-2xl text-[#303030]">Tháng {month}</h3>
    {currentPage === PAGE_LIST["HISTORY_DETAIL"] ? (
      <div className="flex flex-col md:flex-row text-2xl text-right gap-2">
        <p>Đã dùng:</p>
        <p className="font-semibold">{user_detail.used_token} TOKENS</p>
      </div>
    ) : (
      <button onClick={onClick}>
        <p className="underline text-sm">Xem thêm</p>
      </button>
    )}
  </div>
)};
export function HistoryModal() {
  const {
    currentHistoryListBotIndex: botID,
    setCurrentHistoryListBotIndex,
    currentPage,
    setCurrentPage,
  } = useTemplateContext();
  const { user, user_detail } = useAuthState();

  const [threadList, setThreadList] = useState([]);
  const [showThreadList, setShowThreadList] = useState([]);
  const { data, fetchNextPage, isLoading } =
    useGetThreadListByBot(botID);

  const groupByMonthYear = (data) => {
    const result = [];

    data.forEach((item) => {
      if (!item.created_at) return;

      const createdAtDate = new Date(item.created_at);
      const year = createdAtDate.getFullYear();
      const month = createdAtDate.getMonth() + 1;

      const existingGroup = result.find(
        (group) => group.year === year && group.month === month
      );

      if (existingGroup) {
        existingGroup.items.push(item);
        existingGroup.totalTokens += item.token || 0;
      } else {
        result.push({
          year,
          month,
          items: [item],
          totalTokens: item.token || 0,
        });
      }
    });

    return result;
  };

  useEffect(() => {
    if (data?.pages) {
      setThreadList(
        groupByMonthYear(data.pages.flatMap((page) => page.data || []))
      );
    }
  }, [data]);

  const updateLike = (id) => {
    setThreadList((prevThreads) =>
      prevThreads.map((thread) => ({
        ...thread,
        items: thread.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              favorite: !item.favorite,
            };
          }
          return item;
        }),
      }))
    );
  };

  const updateTitle = (id, title) => {
    setThreadList((prevThreads) =>
      prevThreads.map((thread) => ({
        ...thread,
        items: thread.items.map((item) => {
          return item.id === id ? { ...item, name: title } : item;
        }),
      }))
    );
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !isLoading) {
      fetchNextPage();
    }
  };

  const handleClickBack = () => {
    setCurrentPage(PAGE_LIST["HISTORY_LIST"]);
    setCurrentHistoryListBotIndex(null);
  };

  useEffect(() => {
    if (data?.pages) {
      setThreadList(
        groupByMonthYear(data.pages.flatMap((page) => page.data || []))
      );
    }
  }, [data]);

  useEffect(() => {
    if (currentPage === PAGE_LIST["FAVORITE"]) {
      const favoriteItems = threadList.map((thread) => ({
        ...thread,
        items: thread.items.filter((item) => item.favorite),
      }));
      setShowThreadList(favoriteItems);
    } else {
      setShowThreadList(threadList);
    }
  }, [currentPage, threadList]);

  useEffect(() => {
    if (!botID) {
      setThreadList([]);
      setShowThreadList([]);
    }
  }, [botID]);

  return (
    botID && (
      <BaseModal>
        <div className="absolute top-1/2 transform -translate-y-1/2 rounded-xl w-[90%] max-h-[85dvh] md:max-h-[80%] py-[60px] px-[15px] md:px-[60px] flex flex-col gap-[30px] items-start justify-center bg-white min-w-[22.5rem] max-w-[60rem]">
          <img src={ArrowBack} onClick={handleClickBack} />
          <div className="w-full flex flex-col gap-[30px] items-center justify-center  h-[calc(100%-5.5rem)]">
            <h2 className="font-bold text-[3rem] tracking-tight text-center">
              {currentPage}
            </h2>
            <div
              onScroll={handleScroll}
              className={clsx(
                currentPage === PAGE_LIST["HISTORY_DETAIL"]
                  ? "max-h-[30dvh]"
                  : "max-h-[30dvh] ",
                "flex flex-col items-center justify-start h-fit min-h-[7dvh] w-full overflow-y-auto"
              )}
            >
              {
                <>
                  {showThreadList?.length > 0 &&
                    showThreadList.map((list) => (
                      <Fragment key={`${list.month}/${list.year}`}>
                        <HistoryHeader
                          month={list.month}
                          currentPage={currentPage}
                          onClick={() =>
                            setCurrentPage(PAGE_LIST["HISTORY_DETAIL"])
                          }
                        />
                        <div className="flex flex-col flex-grow w-full">
                          {list.items.map((item, index) => (
                            <HistoryDetail
                              id={item.id}
                              key={index}
                              token={item.total_tokens}
                              date={item.created_at}
                              title={item.name}
                              favorite={item.favorite}
                              currentPage={currentPage}
                              setCurrentHistoryListBotIndex={
                                setCurrentHistoryListBotIndex
                              }
                              setCurrentPage={setCurrentPage}
                              updateLike={updateLike}
                              updateTitle={updateTitle}
                            />
                          ))}
                        </div>
                      </Fragment>
                    ))}
                  {isLoading && (
                    <img src={LoadingIcon} className="w-12 h-12 animate-spin" />
                  )}
                </>
              }
            </div>
            {currentPage === PAGE_LIST["HISTORY_LIST"] && (
              <div className="w-full flex justify-end">
                <BaseButton
                  className="rounded-md p-3 bg-[#E3E2E2] text-black text-sm font-semibold"
                  label={"Đoạn chat yêu thích"}
                  onClick={() => setCurrentPage(PAGE_LIST["FAVORITE"])}
                />
              </div>
            )}
            {currentPage === PAGE_LIST["HISTORY_DETAIL"] && (
              <div className="w-full flex flex-col justify-center items-center gap-[30px] md:flex-row md:justify-between md:items-center">
                <p className="font-roboto text-2xl">
                  Còn lại:{" "}
                  <span className="font-semibold">{user.token} TOKENS</span>
                </p>
                <BaseButton
                  className="
                  text-center
                  rounded-md p-3 bg-green text-white text-2xl font-semibold w-full md:w-[360px]"
                  label={"Gia hạn"}
                  onClick={() => setCurrentPage(PAGE_LIST["FAVORITE"])}
                />
              </div>
            )}
          </div>
        </div>
      </BaseModal>
    )
  );
}
