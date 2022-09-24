import { useState } from "react";
import { useLocalStorage } from "react-use";
import { useImmer } from "use-immer";

import NewTransactionModal from "../components/NewTransactionModal";
import Transactions from "../components/Transactions";
import { useToastContext } from "../App";

import { Transaction } from "../interfaces";
import sampleData from "../data/sampleData.json";

import { ReactComponent as NoData } from "../assets/images/home/no-data.svg";

const Home = () => {
  const [newTransactionIsOpen, setNewTransactionIsOpen] = useState(false);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "transactions",
    []
  );
  const [formData, setFormData] = useImmer<{
    data: Transaction;
    error: {
      date: string;
      price: string;
      category: string;
      subCategory: string;
      description: string;
    };
  }>({
    data: {
      id: Date.now(),
      date: new Date(),
      price: "",
      category: "",
      subCategory: "",
      description: "",
    },
    error: {
      date: "",
      price: "",
      category: "",
      subCategory: "",
      description: "",
    },
  });
  const [transactionIdForEdit, setTransactionIdForEdit] = useState(0);
  const { toasts, setToasts } = useToastContext();

  const handleImport = () => {
    // @ts-ignore
    setTransactions(sampleData);
    setToasts([
      ...toasts,
      {
        state: true,
        text: "Transactions imported.",
        type: "success",
      },
    ]);
  };

  return (
    <>
      {transactions?.length ? (
        <Transactions
          transactions={transactions}
          setTransactions={setTransactions}
          setNewTransactionIsOpen={setNewTransactionIsOpen}
          setFormData={setFormData}
          setTransactionIdForEdit={setTransactionIdForEdit}
        />
      ) : (
        <div className="text-center mt-16">
          <NoData className="w-[150px] h-[150px] mx-auto mb-4" />
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={handleImport}
          >
            Import Sample Data
          </button>
        </div>
      )}
      <button
        className="fixed right-4 bottom-4 bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={() => setNewTransactionIsOpen(true)}
      >
        New transaction
      </button>
      <NewTransactionModal
        isOpen={newTransactionIsOpen}
        setIsOpen={setNewTransactionIsOpen}
        setTransactions={setTransactions}
        transactions={transactions}
        formData={formData}
        setFormData={setFormData}
        transactionIdForEdit={transactionIdForEdit}
        setTransactionIdForEdit={setTransactionIdForEdit}
      />
    </>
  );
};

export default Home;
