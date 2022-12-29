import { PanInfo, motion, useAnimationControls } from "framer-motion";

import { Category, Transaction } from "../../interfaces";

import { ReactComponent as HamburgerSodaIcon } from "../../assets/icons/common/hamburger-soda.svg";
import { ReactComponent as CarBus } from "../../assets/icons/common/car-bus.svg";
import { ReactComponent as ReceiptIcon } from "../../assets/icons/common/receipt.svg";
import { ReactComponent as UmbrellaIcon } from "../../assets/icons/common/umbrella.svg";
import { ReactComponent as ShoppingBasketIcon } from "../../assets/icons/common/shopping-basket.svg";
import { ReactComponent as PlayingCardsIcon } from "../../assets/icons/common/playing-cards.svg";
import { ReactComponent as PlaneIcon } from "../../assets/icons/common/plane.svg";
import { ReactComponent as DoctorIcon } from "../../assets/icons/common/doctor.svg";
import { ReactComponent as MoneyIcon } from "../../assets/icons/common/money-bill-wave.svg";
import { ReactComponent as HandHoldingHeartIcon } from "../../assets/icons/common/hand-holding-heart.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/common/trash.svg";
import { ReactComponent as PencilIcon } from "../../assets/icons/common/pencil-square.svg";
import { useState } from "react";

type Props = { transaction: Transaction; showDate?: boolean };

const TransactionCard = ({ transaction, showDate = true }: Props) => {
  const [showMoreActions, setShowMoreActions] = useState(false);
  const controls = useAnimationControls();
  const handleIcon = (category: Category) => {
    switch (category) {
      case "Food":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-orange-600 to-orange-300 rounded-full flex justify-center items-center">
            <HamburgerSodaIcon className="fill-current text-white w-7 h-7" />
          </div>
        );
      case "Transportation":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-green-600 to-green-300 rounded-full flex justify-center items-center">
            <CarBus className="fill-current text-white w-7 h-7" />
          </div>
        );
      case "Charity":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-lime-600 to-lime-300 rounded-full flex justify-center items-center">
            <HandHoldingHeartIcon className="fill-current text-white w-7 h-7" />
          </div>
        );
      case "Insurance":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-cyan-600 to-cyan-300 rounded-full flex justify-center items-center">
            <UmbrellaIcon className="fill-current text-white w-7 h-7" />
          </div>
        );
      case "Buy":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-blue-600 to-blue-300 rounded-full flex justify-center items-center">
            <ShoppingBasketIcon className="fill-current text-white w-7 h-7" />
          </div>
        );
      case "Bill":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-amber-600 to-amber-300 rounded-full flex justify-center items-center">
            <ReceiptIcon className="fill-current text-white w-7 h-7" />
          </div>
        );
      case "Entertainment":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-red-600 to-red-300 rounded-full flex justify-center items-center">
            <PlayingCardsIcon className="fill-current text-white w-7 h-7" />
          </div>
        );
      case "Travel":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-purple-600 to-purple-300 rounded-full flex justify-center items-center">
            <PlaneIcon className="fill-current text-white w-7 h-7" />
          </div>
        );
      case "Health":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-pink-600 to-pink-300 rounded-full flex justify-center items-center">
            <DoctorIcon className="fill-current text-white w-7 h-7" />
          </div>
        );
      case "Income":
        return (
          <div className="h-14 w-14 bg-gradient-to-t from-fuchsia-600 to-fuchsia-300 rounded-full flex justify-center items-center">
            <MoneyIcon className="fill-current text-white w-7 h-7" />
          </div>
        );
      default:
        return <></>;
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -150) {
      setShowMoreActions(true);
      return controls.start({ x: -150 });
    }
    if (info.velocity.x <= 0) {
      setShowMoreActions(false);
      return controls.start({ x: 0 });
    }
    if (info.offset.x > 0) {
      setShowMoreActions(false);
      return controls.start({ x: 0 });
    }
  };

  return (
    <div className="relative">
      <motion.div
        drag="x"
        onDragEnd={handleDragEnd}
        dragConstraints={{ left: -150, right: 0 }}
        animate={controls}
        className="bg-white rounded-3xl p-6 flex justify-between items-center"
      >
        <div className="flex gap-x-4 items-center">
          {handleIcon(transaction.category)}
          <div className="font-semibold text-gray-500">
            {transaction.category}
          </div>
        </div>
        <div>
          <div className="text-gray-500">
            ${Number(transaction.amount).toLocaleString()}
          </div>
          {showDate && (
            <div className="text-gray-400 text-sm">
              {String(transaction.date).split("T")[0]}
            </div>
          )}
        </div>
      </motion.div>
      {showMoreActions && (
        <div className="absolute flex gap-x-5 right-0 top-1/2 transform -translate-y-1/2">
          <PencilIcon className="fill-current text-gray-500 w-8 h-8" />
          <TrashIcon className="fill-current text-gray-500 w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
