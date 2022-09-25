import { AnimatePresence, motion } from "framer-motion";
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
        <motion.div
          animate={
            isOpen
              ? { transform: "rotate(180deg)" }
              : { transform: "rotate(0deg)" }
          }
        >
          <ChevronIcon className={disable ? "text-gray-400" : ""} />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 8, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              opacity: { duration: 0.2 },
              y: { duration: 0.3, type: "spring" },
            }}
            className="absolute bg-white rounded-lg shadow-xl p-4 w-full flex flex-col gap-y-2 z-10"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
