import clsx from "clsx";
import PropTypes from "prop-types";
import { useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";

import { useTemplateContext } from "../../providers/TemplateProvider/TemplateProvider";

import EnterButton from "../../assets/images/homepage/enter.webp";
import PaperClip from "../../assets/images/homepage/paperclip.webp";
import CloseButton from "../../assets/images/homepage/close.png";

const BaseTextArea = ({ width = "w-full" }) => {
  const { id } = useParams();
  const {
    question,
    setQuestion,
    setImageInput,
    handleSubmit,
    isDisabledTextArea,
  } = useTemplateContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleFileInput = () => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    const maxFileSize = 10 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert("File size exceeds the 10MB limit.");
      return;
    }

    setImageInput(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  };

  const handleRemoveFile = () => {
    setPreviewUrl(null);
    setImageInput(null);
  };
  const handleClickSubmit = (id) => {
    handleSubmit(id);
    setPreviewUrl(null);
  };

  return (
    <div
      className={clsx(
        width,
        "p-[12px] bg-primary rounded-xl h-fit relative w-full max-w-[792px] mx-auto"
      )}
    >
      {previewUrl && (
        <div className="h-12 w-fit relative mb-4">
          <img
            src={CloseButton}
            className="h-4 w-4 absolute right-0"
            onClick={handleRemoveFile}
          />
          <img src={previewUrl} className="h-12 w-auto" />
        </div>
      )}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="h-fit max-h-16 w-full bg-transparent resize-none outline-none mb-8"
        rows={3}
        placeholder="Type your message here..."
        onKeyDown={(e) => {
          if (isSubmitting) return;

          if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
            setIsSubmitting(true);
            e.preventDefault();
            handleSubmit(id);
            setTimeout(() => {
              setIsSubmitting(false);
            }, 1000);
          } else if (e.shiftKey && e.ctrlKey) {
            e.preventDefault();
            setQuestion((prev) => prev + "\n");
          }
        }}
      />
      <div className="w-full flex justify-between items-center absolute bottom-[12px] px-[12px] left-0">
        <label className="cursor-pointer">
          <img src={PaperClip} alt="Attach" />
          <input
            accept="image/*"
            type="file"
            className="hidden"
            onChange={(e) => handleFileInput(e)}
          />
        </label>
        <button
          className="cursor-pointer"
          disabled={question.length === 0 || isDisabledTextArea}
          onClick={() => handleClickSubmit(Number(id))}
        >
          <img src={EnterButton} />
        </button>
      </div>
    </div>
  );
};

BaseTextArea.proptypes = {
  title: PropTypes.string,
};

export default BaseTextArea;
