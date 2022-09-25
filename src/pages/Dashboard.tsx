import moment from "moment";

import Summary from "../components/pages/dashboard/Summary";

import { Category, Transaction } from "../interfaces";

import { ReactComponent as GearIcon } from "../assets/icons/common/gear.svg";

import { Link } from "react-router-dom";
import TransactionCard from "../components/common/TransactionCard";

type Props = {};

const Dashboard = ({}: Props) => {
  return (
    <div className="p-6">
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
        {/* @ts-ignore */}
        {JSON.parse(localStorage.getItem("transactions"))
          .slice(0, 10)
          .map((transaction: Transaction) => (
            <TransactionCard transaction={transaction} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
