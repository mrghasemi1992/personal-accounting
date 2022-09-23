import { createContext, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export type Toast = {
  state: boolean;
  text: string;
  type: "success" | "error";
};

type ToastContextIF = {
  toasts: Toast[];
  setToasts: (state: Toast[]) => void;
};

export const ToastContext = createContext<ToastContextIF>({
  toasts: [],
  setToasts: () => {},
});

export const useToastContext = () => useContext(ToastContext);

const App = () => {
  // @ts-ignore
  const [toasts, setToasts] = useState<Toast>([]);

  return (
    <BrowserRouter>
      {/* @ts-ignore */}
      <ToastContext.Provider value={{ toasts, setToasts }}>
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
