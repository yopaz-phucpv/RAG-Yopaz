import { useState, useEffect } from "react";
import clsx from "clsx";

import { useNavigate } from "react-router-dom";

import { useTemplateContext } from "../providers/TemplateProvider/TemplateProvider";
import { MAIN_PATHS } from "../routes/main";


import Glass from "../assets/images/homepage/glass.webp";
import Sidebar from "../assets/images/homepage/sidebar.webp";
import Phone from "../assets/images/menu/phone.webp";
import LoadingIcon from "../assets/images/homepage/loading.png";

const Bot = ({
  id,
  name,
  handleSelectHistoryIndex,
  handleSelectBotIndex,
}) => {
  return (
    <div className="cursor-pointer pr-[3px] flex items-center justify-between pb-[3px] border-b border-black w-full md:max-w-[219px] hover:bg-[#F1F1F1] transition duration-150 ease-in-out">
      <p className="truncate" onClick={() => handleSelectHistoryIndex(id)}>
        {name}
      </p>
      <img
        src={Phone}
        className="w-[14px] h-[14px]"
        onClick={() => handleSelectBotIndex(id)}
      />
    </div>
  );
};

export function SideMenu() {
  const {
    botList,
    setCurrentBot,
    isLoadingBot,
    setCurrentHistoryListBotIndex,
  } = useTemplateContext();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredBot, setFilteredBot] = useState();
  const [showInput, setShowInput] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const clickSelectHistoryIndex = (index) => {
    setIsOpen(false);
    setCurrentHistoryListBotIndex(index);
  };
  const clickSelectBotIndex = (index) => {
    setIsOpen(false);
    setCurrentBot(index);
  };

  useEffect(() => {
    if (term.length > 0) {
      setFilteredBot(
        botList.filter((bot) =>
          bot.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredBot(botList);
    }
  }, [term, botList]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className={`h-screen relative -top-[30px] -left-[30px] z-50 bg-[#F9F9F9] overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "w-full md:w-[300px] max-w-[80dvw]" : "w-0"
        }`}
      >
        <div className="p-[30px] flex flex-col gap-[30px] h-full w-full">
          <div className="flex flex-col justify-between items-start gap-20">
            <div
              className="p-3 bg-primary rounded-md aspect-square w-10 h-10 cursor-pointer mr-[30px]"
              onClick={() => setIsOpen(false)}
            >
              <img src={Sidebar} className="" />
            </div>
            <div className="flex gap-3 w-full">
              <img
                onClick={() => setShowInput((prev) => !prev)}
                src={Glass}
                className="w-4 h-4 relative left-4 hover:cursor-pointer"
              />
              {
                showInput &&
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="border-b border-black h-4 ml-4  bg-transparent focus:outline-none text-xs px-2"
                />
              }
            </div>
          </div>
          <div
            className={clsx(
              isLoadingBot ? "justify-center items-center" : "",
              "flex flex-col gap-[30px] overflow-y-scroll h-[calc(100%-13rem)] pr-3 w-full custom-scrollbar"
            )}
          >
            {isLoadingBot || !filteredBot ? (
              <img
                src={LoadingIcon}
                className="w-12 h-12 animate-spin mx-auto"
              />
            ) : (
              filteredBot?.map((bot) => (
                <Bot
                  key={bot.id}
                  name={bot.name}
                  id={bot.id}
                  description={bot.description}
                  handleSelectHistoryIndex={(index) =>
                    clickSelectHistoryIndex(index)
                  }
                  handleSelectBotIndex={(index) => {
                    clickSelectBotIndex(index);
                    navigate(MAIN_PATHS.HomePage);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {!isOpen && (
        <div
          className="p-3 bg-primary rounded-md aspect-square w-10 h-10 cursor-pointer mr-[30px]"
          onClick={() => setIsOpen(true)}
        >
          <img src={Sidebar} className="" />
        </div>
      )}
    </>
  );
}
