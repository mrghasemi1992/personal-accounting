import { useEffect, useState } from "react";
import _ from "underscore";
import { Link } from "react-router-dom";

import TransactionCard from "../components/common/TransactionCard";

import { Transaction as TransactionIF } from "../interfaces";
import { useTransactionStore } from "../stores/transactionStore";

import { ReactComponent as ArrowIcon } from "../assets/icons/common/arrow-down.svg";

const Transactions = () => {
  const { transactions } = useTransactionStore();
  const [dates, setDates] = useState<string[]>([]);
  const [groupedTransactions, setGroupedTransactions] = useState<
    TransactionIF[][]
  >([]);

  useEffect(() => {
    let tempDates: string[] = [];
    let tempGroupedTransactions: TransactionIF[][] = [];

    Object.entries(
      _.groupBy(
        transactions.sort((a: TransactionIF, b: TransactionIF) =>
          (a.date || 2) < (b.date || 1) ? 1 : -1
        ),
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
    <div className="p-6 pb-32">
      <div className="bg-white rounded-xl w-10 h-10 flex items-center justify-center">
        <Link
          to="/"
          className="rounded-full bg-gray-400 w-8 h-8 flex justify-center items-center fill-current"
        >
          <ArrowIcon className="text-white transform rotate-90 w-4 h-4" />
        </Link>
      </div>
      {dates.map((date, j) => (
        <>
          <div className="mt-8 mb-4" key={j}>
            {date}
          </div>
          <div className="flex flex-col gap-y-6">
            {groupedTransactions[j].map((transaction, index) => (
              <TransactionCard
                key={index}
                transaction={transaction}
                showDate={false}
              />
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default Transactions;
