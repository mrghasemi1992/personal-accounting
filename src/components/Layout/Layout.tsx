import { ReactNode } from "react";

import { useToastContext } from "../../App";

import Toast from "../common/Toast";

import Header from "./Header";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  const { toastState, setToastState } = useToastContext();

  return (
    <>
      <Header />
      <main>{children}</main>
      <Toast
        isOpen={toastState.state}
        setState={setToastState}
        text={toastState.text}
        type={toastState.type}
      />
    </>
  );
};

export default Layout;
