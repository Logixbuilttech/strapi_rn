// components/TextInput.js
const TextInput = ({ name, value, onChange, placeholder, type = "text", required }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="bg-[rgba(22,54,61,.08)] w-full border-0 rounded-[8px] h-[44px] lg:h-[60px] flex items-center pl-4 md:pl-6 text-[14px] lg:text-[22px] text-[#16363D] \
      leading-[120%] tracking-[-0.03em] !font-Archivo font-medium"
    />
  );
};

export default TextInput;
