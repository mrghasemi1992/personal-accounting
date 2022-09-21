import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as ListIcon } from "../../assets/icons/common/list.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/common/close.svg";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setHeaderTitle("Transactions");
    } else {
      const title = location.pathname.slice(1);
      setHeaderTitle(title.charAt(0).toUpperCase() + title.slice(1));
    }
  }, [location]);

  return (
    <header>
      <div className="px-4 py-5 bg-blue-600 flex gap-x-5 items-center text-lg text-white">
        <ListIcon
          className="text-white transform scale-110 cursor-pointer"
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        />
        <h1>{headerTitle}</h1>
      </div>

      <AnimatePresence>
        {menuIsOpen && (
          <motion.div
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -500 }}
            className="fixed inset-0 bg-white z-10 px-8 py-16"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CloseIcon
              className="absolute right-4 top-4 cursor-pointer text-gray-500"
              onClick={() => setMenuIsOpen(false)}
            />
            <Link
              to="/"
              className={`${
                location.pathname === "/" ? "text-blue-600 " : ""
              }text-xl font-medium`}
              onClick={() => setMenuIsOpen(false)}
            >
              Transactions
            </Link>
            <div className="text-xl font-medium my-4 text-gray-300">
              Reports
            </div>
            <Link
              to="/settings"
              className={`${
                location.pathname === "/settings" ? "text-blue-600 " : ""
              }text-xl font-medium`}
              onClick={() => setMenuIsOpen(false)}
            >
              Settings
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
