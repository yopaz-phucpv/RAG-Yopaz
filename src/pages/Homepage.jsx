import ThreadTemplate from "../template/ThreadTemplate";
import BaseTextArea from "../components/base/BaseTextArea";

import "../App.css"

const CustomInfoBox = ({ title }) => {
  return (
    <p className="border border-black-translucent rounded-lg p-3">
      {title}
    </p>
  );
};

function Homepage() {
  const infoBoxes = [
    "Tạo hình ảnh",
    "Tóm tắt văn bản",
    "Nhận lời khuyên",
    "Phân tích hình ảnh",
    "Thêm",
  ];

  return (
    <>
      <ThreadTemplate>
        <div className="px-[30px] mx-auto w-full min-w-[22.5rem] max-w-[51.75rem] h-[100dvh] flex-col items-center justify-center flex gap-20">
          <div className="flex flex-col w-full text-center">
            <h1 className="font-bold text-[3rem] leading-[58px]">AI Content</h1>
            <h2 className="text-xl">
              AI hỗ trợ trong lĩnh vực kinh tế, kế toán, kiểm toán ...
            </h2>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-[676px]">
            <div className="flex flex-wrap gap-3 font-roboto justify-center">
              {infoBoxes.map((title, index) => (
                <CustomInfoBox title={title} key={index} />
              ))}
            </div>
            <div>
              <BaseTextArea/>
            </div>
          </div>
        </div>
      </ThreadTemplate>
    </>
  );
}

export default Homepage;
