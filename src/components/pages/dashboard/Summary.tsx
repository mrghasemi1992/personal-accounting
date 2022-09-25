import { ReactComponent as ArrowIcon } from "../../../assets/icons/common/arrow.svg";
import { useTransactionStore } from "../../../stores/transactionStore";

const Summary = () => {
  const { transactions } = useTransactionStore();

  let balance = 0;
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((transaction) => {
    if (Number(transaction.amount) > 0) {
      totalIncome += Number(transaction.amount);
    }
  });

  transactions.forEach((transaction) => {
    if (Number(transaction.amount) < 0) {
      totalExpenses += Number(transaction.amount);
    }
  });

  transactions.forEach(
    (transaction) => (balance += Number(transaction.amount))
  );

  return (
    <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6 rounded-3xl">
      <div className="text-center text-white text-2xl font-medium">
        Total Balance
      </div>
      <div className="text-center text-white text-5xl mt-4 font-medium">
        ${balance.toLocaleString()}
      </div>
      <div className="flex justify-between mt-8">
        <div className="flex items-center gap-x-4">
          <div className="bg-white rounded-full p-1 scale-125 opacity-60">
            <ArrowIcon className="text-green-500" />
          </div>
          <div>
            <p className="text-white">Income</p>
            <p className="text-white">${totalIncome.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-white rounded-full p-1 scale-125 opacity-60">
            <ArrowIcon className="text-red-500 transform rotate-180" />
          </div>
          <div>
            <p className="text-white">Expenses</p>
            <p className="text-white">
              ${(totalExpenses * -1).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
