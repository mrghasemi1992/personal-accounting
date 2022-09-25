import { ReactComponent as GridIcon } from "../../assets/icons/common/grid.svg";
import { ReactComponent as BarChartIcon } from "../../assets/icons/common/bar-chart.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/common/plus.svg";
import { Link } from "react-router-dom";
import NewTransactionModal from "../NewTransactionModal";
import { useState } from "react";

const Navbar = () => {
  const [newTransactionIsOpen, setNewTransactionIsOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white w-full h-20 rounded-t-3xl fixed bottom-0 flex items-center justify-between px-16"
        style={{ boxShadow: "0px 0px 15px 0px rgba(217,217,217,1)" }}
      >
        <Link to="/">
          <GridIcon className="scale-125 text-gray-400" />
        </Link>
        <div
          onClick={() => setNewTransactionIsOpen(true)}
          className="cursor-pointer w-16 h-16 rounded-full flex items-center justify-center absolute right-1/2 transform translate-x-1/2 -top-8 bg-gradient-to-t from-indigo-400 via-purple-400 to-pink-400"
        >
          <PlusIcon className="text-white w-12 h-12" />
        </div>
        <Link to="/reports">
          <BarChartIcon className="scale-125 text-gray-400" />
        </Link>
      </div>

      <NewTransactionModal
        isOpen={newTransactionIsOpen}
        setIsOpen={setNewTransactionIsOpen}
      />
    </>
  );
};

export default Navbar;
