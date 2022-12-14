import { ReactNode } from "react";

import { ReactComponent as CloseIcon } from "../../assets/icons/common/close.svg";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  children: ReactNode;
  crossButton?: boolean;
  footer?: boolean;
  rightButtonClassName?: string;
  leftButtonClassName?: string;
  rightButtonText?: string;
  leftButtonText?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  wrapperClassName?: string;
};

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  crossButton = true,
  footer = true,
  leftButtonClassName,
  leftButtonText,
  rightButtonClassName,
  rightButtonText,
  onClose,
  onSubmit,
  wrapperClassName,
}: Props) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-[rgba(0, 0, 0, 0.2)]">
          <div
            className={
              wrapperClassName
                ? wrapperClassName
                : "bg-white rounded-md relative p-6 mt-20 mx-4"
            }
          >
            {crossButton && (
              <CloseIcon
                className="cursor-pointer absolute top-4 right-4"
                onClick={() => setIsOpen(false)}
              />
            )}
            <main className={crossButton ? "mt-6" : ""}>{children}</main>
            {footer && (
              <>
                <hr className="mt-4 mb-2" />
                <footer className="flex gap-x-2 justify-end">
                  <button
                    className={`bg-gradient-to-l from-gray-300 to-gray-500 text-white rounded-md px-4 py-2${
                      leftButtonClassName ? " " + leftButtonClassName : ""
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                      onClose && onClose();
                    }}
                  >
                    {leftButtonText ? leftButtonText : "Close"}
                  </button>
                  <button
                    className={
                      rightButtonClassName
                        ? `${rightButtonClassName} text-white rounded-md px-4 py-2`
                        : "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white rounded-md px-4 py-2"
                    }
                    onClick={onSubmit}
                  >
                    {rightButtonText ? rightButtonText : "Submit"}
                  </button>
                </footer>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
