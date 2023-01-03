import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as ListIcon } from "../../assets/icons/common/list.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/common/close.svg";
import logo from "../../assets/images/logo.png";

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
      <div className="px-4 py-5 bg-blue-600 flex justify-between items-center text-lg text-white">
        <div className="flex gap-x-5 items-center">
          <ListIcon
            className="text-white transform scale-110 cursor-pointer"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          />
          <h1>{headerTitle}</h1>
        </div>
        <img src={logo} width={32} height={32} alt="Logo" />
      </div>

      {menuIsOpen && (
        <div className="fixed inset-0 bg-white z-10 px-8 py-16 flex flex-col gap-y-4">
          <CloseIcon
            className="absolute right-4 top-4 cursor-pointer text-gray-500"
            onClick={() => setMenuIsOpen(false)}
          />
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "text-blue-600 " : "text-gray-600"
            } text-xl font-medium`}
            onClick={() => setMenuIsOpen(false)}
          >
            Transactions
          </Link>
          <Link
            to="/reports"
            className={`${
              location.pathname === "/reports"
                ? "text-blue-600 "
                : "text-gray-600"
            } text-xl font-medium`}
            onClick={() => setMenuIsOpen(false)}
          >
            Reports
          </Link>
          <Link
            to="/settings"
            className={`${
              location.pathname === "/settings"
                ? "text-blue-600 "
                : "text-gray-600"
            } text-xl font-medium`}
            onClick={() => setMenuIsOpen(false)}
          >
            Settings
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
