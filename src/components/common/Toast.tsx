import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { ToastStateIF } from "../../App";

import { ReactComponent as CloseIcon } from "../../assets/icons/common/close.svg";

type Props = {
  isOpen: boolean;
  setState: (state: ToastStateIF) => void;
  text: string;
  type: "success" | "error";
};

const Toast = ({ isOpen, setState, text, type }: Props) => {
  // const timer = setTimeout(() => {
  //   setState({ state: false, text, type });
  // }, 5000);

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 16 }}
          exit={{ opacity: 0, x: -500 }}
          className={`py-2 px-3 ${
            type === "success"
              ? "bg-green-500 shadow-green-500/25"
              : "bg-red-500 shadow-red-500/25"
          } shadow-lg rounded-md flex items-center justify-between absolute bottom-4`}
        >
          <p className="mr-4 text-white">{text}</p>
          <CloseIcon
            className="text-white"
            onClick={() => setState({ state: !isOpen, text, type })}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
