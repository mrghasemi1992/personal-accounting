import Summary from "../components/pages/dashboard/Summary";

import { Transaction } from "../interfaces";

import { ReactComponent as GearIcon } from "../assets/icons/common/gear.svg";

import { Link } from "react-router-dom";
import TransactionCard from "../components/common/TransactionCard";
import { useTransactionStore } from "../stores/transactionStore";

const Dashboard = () => {
  const { transactions } = useTransactionStore();

  return (
    <div className="p-6 pb-32">
      <div className="flex gap-x-4"></div>
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
        <Link to="/transactions" className="text-sm">
          View All
        </Link>
      </div>
      <div className="gap-y-6 flex flex-col">
        {transactions.slice(0, 10).map((transaction: Transaction) => (
          <TransactionCard transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
