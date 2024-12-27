export default function BaseInput({
  name,
  label,
  value,
  type = '',
  placeholder = 'Nguyễn Văn A',
  labelClassName = 'mb-2 text-base text-dark',
  inputClassName = `border border-dark-gray placeholder:text-gray text-black text-gray disabled:bg-white rounded-lg px-4 py-3`,
  onChange, isDisabled
}) {
  return (
    <div className='flex flex-col gap-2'>
      <label className={labelClassName}>{label}</label>
      <input
        name={name}
        disabled={isDisabled}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
}