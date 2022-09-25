// import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

// import Toast from "../common/Toast";

import Navbar from "./Navbar";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <main>{children}</main>
      <Navbar />
      {/* <AnimatePresence>
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            index={index}
            isOpen={toast.state}
            setToasts={setToasts}
            toasts={toasts}
            text={toast.text}
            type={toast.type}
          />
        ))}
      </AnimatePresence> */}
    </>
  );
};

export default Layout;
