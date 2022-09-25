import moment from "moment";

import { Category, Transaction } from "../../interfaces";

import { ReactComponent as EggFriedIcon } from "../../assets/icons/common/egg-fried.svg";
import { ReactComponent as TrainIcon } from "../../assets/icons/common/train.svg";
import { ReactComponent as ReceiptIcon } from "../../assets/icons/common/receipt.svg";

type Props = { transaction: Transaction; showDate?: boolean };

const TransactionCard = ({ transaction, showDate = true }: Props) => {
  const handleIcon = (category: Category) => {
    switch (category) {
      case "Food":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-orange-600 to-orange-300 rounded-full flex justify-center items-center">
            <EggFriedIcon className="text-white transform scale-150" />
          </div>
        );
      case "Transportation":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-green-600 to-green-300 rounded-full flex justify-center items-center">
            <TrainIcon className="text-white transform scale-125" />
          </div>
        );
      case "Bill":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-red-600 to-red-300 rounded-full flex justify-center items-center">
            <ReceiptIcon className="text-white transform scale-125" />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 flex justify-between items-center">
      <div className="flex gap-x-4 items-center">
        {handleIcon(transaction.category)}
        <div className="font-semibold text-gray-500">
          {transaction.category}
        </div>
      </div>
      <div>
        <div className="text-gray-500">${transaction.price}</div>
        {showDate && (
          <div className="text-gray-400 text-sm">
            {moment(transaction.date).fromNow()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
