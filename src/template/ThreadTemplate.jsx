import { HistoryModal } from "../components/Modal/HistoryModal";
import { BaseDropdown } from "../components/base/BaseDropdown";
import { SideMenu } from "../components/SideMenu";
import { Avatar } from "../components/Avatar";


function ThreadTemplate({ children }) {
  return (
    <>
      <div className="w-full flex items-start justify-center relative h-full box-border">
        <div className="absolute p-[30px] flex w-full h-full">
          <SideMenu />
          <BaseDropdown />
          <Avatar />
        </div>
        {children}
      </div>
      <HistoryModal />
    </>
  );
}
export default ThreadTemplate;
