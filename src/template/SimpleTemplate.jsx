import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import ArrowBack from "../assets/images/payment/arrow-back.webp"

export default function SimpleTemplate({
  children,
  className = "max-w-[792px]",
}) {
  const navigate = useNavigate();
  return (
    <div
      className={clsx(
        "font-inter mx-auto w-full md:w-full py-[3.75rem] flex flex-col gap-y-[60px] px-4 text-small font-normal",
        className
      )}
    >
      <button onClick={() => navigate(-1)}>
        <img
          src={ArrowBack}
          alt="Back Arrow"
          className="w-8"
        />
      </button>

      {children}
    </div>
  );
}
