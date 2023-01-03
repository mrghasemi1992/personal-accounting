import { ReactNode } from "react";

// import Toast from "../common/Toast";

import Navbar from "./Navbar";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <main>{children}</main>
      <Navbar />
      {/*{toasts.map((toast, index) => (*/}
      {/*  <Toast*/}
      {/*    key={index}*/}
      {/*    index={index}*/}
      {/*    isOpen={toast.state}*/}
      {/*    setToasts={setToasts}*/}
      {/*    toasts={toasts}*/}
      {/*    text={toast.text}*/}
      {/*    type={toast.type}*/}
      {/*  />*/}
      {/*))}*/}
    </>
  );
};

export default Layout;
