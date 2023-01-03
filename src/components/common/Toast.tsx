import { useEffect } from "react";

import { ReactComponent as CloseIcon } from "../../assets/icons/common/close.svg";

export type ToastIF = {
  state: boolean;
  text: string;
  type: "success" | "error";
};

type Props = {
  isOpen: boolean;
  setToasts: (state: ToastIF[]) => void;
  text: string;
  type: "success" | "error";
  index: number;
  toasts: ToastIF[];
};

const Toast = ({ isOpen, setToasts, text, type, index, toasts }: Props) => {
  const timer = setTimeout(() => {
    setToasts([...toasts.slice(0, index), ...toasts.slice(index + 1)]);
  }, 5000);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      {isOpen && (
        <div
          className={`py-2 px-3 ${
            type === "success"
              ? "bg-green-500 shadow-green-500/25"
              : "bg-red-500 shadow-red-500/25"
          } shadow-lg rounded-md flex items-center justify-between absolute`}
          key={index}
          style={{ bottom: `${16 + 46 * index}px` }}
        >
          <p className="mr-4 text-white">{text}</p>
          <CloseIcon
            className="text-white"
            onClick={() => {
              setToasts([
                ...toasts.slice(0, index),
                ...toasts.slice(index + 1),
              ]);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Toast;
