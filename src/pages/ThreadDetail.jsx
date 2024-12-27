import ThreadTemplate from "../template/ThreadTemplate";
import BaseDialog from "../components/base/BaseDialog";

import BaseTextArea from "../components/base/BaseTextArea";

function ThreadDetail() {
  return (
    <>
      <ThreadTemplate>
        <div className="pb-[30px] mt-20 w-full mx-auto px-[30px] flex flex-col h-[calc(100dvh-80px)]">
          <BaseDialog />
          <BaseTextArea />
        </div>
      </ThreadTemplate>
    </>
  );
}

export default ThreadDetail;
