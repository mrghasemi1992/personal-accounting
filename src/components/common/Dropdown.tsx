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
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full ${
          disable ? "bg-gray-200" : "bg-white"
        } rounded-xl outline-none p-4 cursor-pointer flex justify-between items-center ${
          className ? className : ""
        }`}
        onClick={() => !disable && setIsOpen(!isOpen)}
      >
        {value ? (
          <div className="text-gray-700">{value}</div>
        ) : (
          <div className="text-gray-400">{placeholder}</div>
        )}
        <ChevronIcon
          className={`transform${disable ? " text-gray-400" : ""} ${
            isOpen ? "transform rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute bg-white rounded-lg shadow-xl p-4 w-full flex flex-col gap-y-2 z-10">
          {items.map((item, index) => (
            <p
              key={index}
              className="cursor-pointer"
              onClick={() => {
                setValue(item);
                setIsOpen(false);
              }}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
