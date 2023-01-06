import { useEffect } from "react";
import { ReactComponent as ChevronIcon } from "../../assets/icons/common/chevron.svg";
import "./Dropdown.module.css";

type Props = {
  placeholder: string;
  items: { title: string; value: string }[];
  value: any;
  setValue: any;
  disabled?: boolean;
  className?: string;
};

const Dropdown = ({
  placeholder,
  items,
  setValue,
  value,
  disabled,
  className,
}: Props) => {
  useEffect(() => {
    if (value === placeholder) {
      setValue("");
    }
  }, [value]);
  return (
    <select
      className={`w-full ${
        disabled ? "bg-gray-200" : "bg-white"
      } rounded-xl outline-none p-4 cursor-pointer flex justify-between items-center ${
        className ? className : ""
      } ${!value ? "text-gray-400" : ""}`}
      disabled={disabled}
      value={value}
      onChange={({ target }) => setValue(target.value)}
    >
      <option value={placeholder}>{placeholder}</option>
      {items.map((item) => (
        <option value={item.value}>{item.title}</option>
      ))}
    </select>
  );
};

export default Dropdown;
