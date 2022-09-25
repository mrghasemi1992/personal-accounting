import Summary from "../components/pages/dashboard/Summary";

import { Transaction } from "../interfaces";

import { ReactComponent as GearIcon } from "../assets/icons/common/gear.svg";

import { Link } from "react-router-dom";
import TransactionCard from "../components/common/TransactionCard";
import { useTransactionStore } from "../stores/transactionStore";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { transactions, removeAll, importSample } = useTransactionStore();
  const [firstTime, setFirstTime] = useState(false);
  const [name, setName] = useState("");

  const handleImport = () => {
    removeAll();
    importSample();
  };

  useEffect(() => {
    if (!localStorage.getItem("name")) {
      setFirstTime(true);
    }
  }, [firstTime]);

  const handleSubmit = () => {
    localStorage.setItem("name", name);
    setFirstTime(false);
  };

  return (
    <>
      {firstTime ? (
        <div className="fixed inset-0 bg-cultured z-10 p-6">
          <div className="font-semibold">
            Hi, This is a simple app for managing your money. To start please
            type your name below:
          </div>
          <input
            className="w-full rounded-xl outline-none p-4 my-4"
            placeholder="What's your name?"
            type="text"
            name="name"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white w-full h-14 rounded-xl font-semibold text-lg"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="p-6 pb-32">
          <div className="flex justify-between items-center mb-4">
            <div>{localStorage.getItem("name")}</div>
            <Link
              to="/settings"
              className="bg-white w-10 h-10 inline-flex items-center justify-center rounded-xl"
            >
              <GearIcon className="scale-125 text-gray-400" />
            </Link>
          </div>
          <Summary />

          <div className="flex justify-between items-center mt-8 mb-4">
            <div className="font-bold text-lg">Transactions</div>
            <Link
              to={transactions.length ? "/transactions" : "/"}
              className={`text-sm${
                transactions.length ? "" : " text-gray-300"
              }`}
            >
              View All
            </Link>
          </div>
          {transactions.length ? (
            <div className="gap-y-6 flex flex-col">
              {transactions.slice(0, 10).map((transaction: Transaction) => (
                <TransactionCard transaction={transaction} />
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <div>No transactions!</div>
              <button
                className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-4 py-3 rounded-xl w-full mt-2"
                onClick={handleImport}
              >
                Import Sample Data
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
