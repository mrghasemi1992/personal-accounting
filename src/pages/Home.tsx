import { useState } from "react";
import { useLocalStorage } from "react-use";
import { useImmer } from "use-immer";

import NewTransactionModal from "../components/NewTransactionModal";
import Transactions from "../components/Transactions";

import { Transaction } from "../interfaces";

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
        <></>
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
