import { useRef } from "react";

import useOnClickOutside from "../../utils/useOnClickOutside";

import { ReactComponent as ChevronIcon } from "../../assets/icons/common/chevron.svg";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  placeholder: string;
  items: string[];
  value: any;
  setValue: any;
  disable?: boolean;
  className?: string;
};

const Dropdown = ({
  isOpen,
  setIsOpen,
  placeholder,
  items,
  setValue,
  value,
  disable,
  className,
}: Props) => {
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <select
      className={`w-full ${
        disable ? "bg-gray-200" : "bg-white"
      } rounded-xl outline-none p-4 cursor-pointer flex justify-between items-center ${
        className ? className : ""
      }`}
    >
      {items.map((item) => (
        <option onClick={() => setValue(item)}>{item}</option>
      ))}
    </select>
  );
};

export default Dropdown;
