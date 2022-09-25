import Summary from "../components/pages/dashboard/Summary";

import { Transaction } from "../interfaces";

import { ReactComponent as GearIcon } from "../assets/icons/common/gear.svg";

import { Link } from "react-router-dom";
import TransactionCard from "../components/common/TransactionCard";
import { useTransactionStore } from "../stores/transactionStore";
import Modal from "../components/common/Modal";
import { useState } from "react";

const Dashboard = () => {
  const { transactions, removeAll, importSample } = useTransactionStore();
  const [importModalIsOpen, setImportModalIsOpen] = useState(false);

  const handleImport = () => {
    removeAll();
    importSample();
    setImportModalIsOpen(false);
  };

  return (
    <>
      <div className="p-6 pb-32">
        <div className="text-right">
          <Link
            to="/settings"
            className="bg-white w-10 h-10 inline-flex items-center justify-center rounded-xl mb-4"
          >
            <GearIcon className="scale-125 text-gray-400" />
          </Link>
        </div>
        <Summary />

        <div className="flex justify-between items-center mt-8 mb-4">
          <div className="font-bold text-lg">Transactions</div>
          <Link
            to={transactions.length ? "/transactions" : "/"}
            className={`text-sm${transactions.length ? "" : " text-gray-300"}`}
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
              onClick={() => setImportModalIsOpen(true)}
            >
              Import Sample Data
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={importModalIsOpen}
        setIsOpen={setImportModalIsOpen}
        rightButtonText="Import"
        rightButtonClassName="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
        onSubmit={handleImport}
      >
        <p className="text-indigo-500">
          All previous data will be{" "}
          <span className="border-b-red-400 inline-block border-b-2 border-dashed">
            replaced by
          </span>{" "}
          the sample data. Are you sure?
        </p>
      </Modal>
    </>
  );
};

export default Dashboard;
