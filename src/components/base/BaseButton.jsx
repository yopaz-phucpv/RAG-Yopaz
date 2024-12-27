export default function BaseButton({
  label,
  className = "justify-center p-3 rounded-lg font-semibold text-2xl text-center bg-green text-white flex items-center gap-2",
  onClick,
  isDisabled,
}) {
  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
}
