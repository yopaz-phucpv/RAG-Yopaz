import clsx from "clsx";

export const BaseMenuItem = ({ label, image, hasBorderBottom, onClick }) => {
  return (
    <div className={clsx("cursor-pointer flex gap-3 items-center min-w-[180px] hover:bg-[#F1F1F1] transition duration-150 ease-in-out", hasBorderBottom ? 'border-b border-black pb-3' : '')} onClick={onClick}>
      <img src={image} className="h-4 w-4"/>
      <p>{label}</p>
    </div>
  );
};
