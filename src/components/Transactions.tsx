import _ from "underscore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Updater } from "use-immer";

import Transaction from "./Transaction";

import { Transaction as TransactionIF } from "../interfaces";

const handleDate = (date: string) => {
  const now = new Date().toISOString().split("T")[0];
  if (date === now) return "today";
  else return moment(date).fromNow();
};

type Props = {
  transactions: TransactionIF[];
  setTransactions: (transactions: TransactionIF[]) => void;
  setNewTransactionIsOpen: (state: boolean) => void;
  setFormData: Updater<{
    data: TransactionIF;
    error: {
      date: string;
      price: string;
      category: string;
      subCategory: string;
      description: string;
    };
  }>;
  setTransactionIdForEdit: (state: number) => void;
};

const Transactions = ({
  transactions,
  setTransactions,
  setNewTransactionIsOpen,
  setFormData,
  setTransactionIdForEdit,
}: Props) => {
  const [dates, setDates] = useState<string[]>([]);
  const [groupedTransactions, setGroupedTransactions] = useState<
    TransactionIF[][]
  >([]);

  useEffect(() => {
    let tempDates: string[] = [];
    let tempGroupedTransactions: TransactionIF[][] = [];
    Object.entries(
      _.groupBy(
        transactions.sort((a, b) => ((a.date || 2) < (b.date || 1) ? 1 : -1)),
        (transaction) => {
          if (transaction.date) return String(transaction.date).split("T")[0];
          else return new Date().toDateString();
        }
      )
    ).forEach((item) => {
      tempDates.push(item[0]);
      tempGroupedTransactions.push(item[1]);
    });

    setDates(tempDates);
    setGroupedTransactions(tempGroupedTransactions);
  }, [transactions]);

  return (
    <div className="pb-16 px-4">
      {dates.map((date, j) => (
        <>
          <div className="mt-8 mb-4" key={j}>
            {handleDate(date)}
          </div>
          {groupedTransactions[j].map((transaction, index) => (
            <Transaction
              key={transaction.id}
              index={index}
              transaction={transaction}
              setFormData={setFormData}
              setNewTransactionIsOpen={setNewTransactionIsOpen}
              setTransactionIdForEdit={setTransactionIdForEdit}
              transactions={transactions}
              setTransactions={setTransactions}
            />
          ))}
        </>
      ))}
    </div>
  );
};

export default Transactions;
