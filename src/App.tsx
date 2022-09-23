import { createContext, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export type ToastStateIF = {
  state: boolean;
  text: string;
  type: "success" | "error";
};

type ToastContextIF = {
  toastState: ToastStateIF;
  setToastState: (state: ToastStateIF) => void;
};

export const ToastContext = createContext<ToastContextIF>({
  toastState: { state: false, text: "", type: "success" },
  setToastState: () => {},
});

export const useToastContext = () => useContext(ToastContext);

const App = () => {
  const [toastState, setToastState] = useState<ToastStateIF>({
    state: false,
    text: "",
    type: "success",
  });

  return (
    <BrowserRouter>
      <ToastContext.Provider value={{ toastState, setToastState }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
      </ToastContext.Provider>
    </BrowserRouter>
  );
};

export default App;
