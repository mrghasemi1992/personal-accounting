import React, { useRef, useState } from "react";
import { Updater } from "use-immer";
import { AnimatePresence, motion } from "framer-motion";

import Modal from "./common/Modal";

import { Category, Transaction as TransactionIF } from "../interfaces";
import useOnClickOutside from "../utils/useOnClickOutside";

import { ReactComponent as ThreeDotsIcon } from "../assets/icons/common/three-dots.svg";
import { ReactComponent as TrashIcon } from "../assets/icons/common/trash.svg";
import { ReactComponent as PencilSquareIcon } from "../assets/icons/common/pencil-square.svg";
import { ReactComponent as EggFriedIcon } from "../assets/icons/common/egg-fried.svg";
import { ReactComponent as TrainIcon } from "../assets/icons/common/train.svg";
import { ReactComponent as ReceiptIcon } from "../assets/icons/common/receipt.svg";

type Props = {
  index: number;
  transaction: TransactionIF;
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
  setNewTransactionIsOpen: (state: boolean) => void;
  setTransactionIdForEdit: (state: number) => void;
  transactions: TransactionIF[];
  setTransactions: (transactions: TransactionIF[]) => void;
};

const Transaction = ({
  transaction,
  index,
  setTransactionIdForEdit,
  setNewTransactionIsOpen,
  setFormData,
  transactions,
  setTransactions,
}: Props) => {
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [moreItems, setMoreItems] = useState(false);

  const handleEdit = (transaction: TransactionIF) => {
    setMoreItems(false);
    setTransactionIdForEdit(transaction.id);
    setFormData((draft) => {
      draft.data.price = transaction.price;
      draft.data.category = transaction.category;
      draft.data.subCategory = transaction.subCategory;
      draft.data.description = transaction.description;
      draft.data.id = transaction.id;
      draft.data.date = transaction.date && new Date(transaction.date);
    });
    setNewTransactionIsOpen(true);
  };

  const handleDeleteModal = () => {
    setDeleteModal(true);
    setMoreItems(false);
  };

  const handleRemove = () => {
    setTransactions(transactions.filter((item) => item.id !== transaction.id));
    setDeleteModal(false);
  };

  const handleIcon = (category: Category) => {
    switch (category) {
      case "Food":
        return (
          <div className="h-12 w-12 bg-orange-500 rounded-full mr-4 flex justify-center items-center">
            <EggFriedIcon className="text-white transform scale-125" />
          </div>
        );
      case "Transportation":
        return (
          <div className="h-12 w-12 bg-green-500 rounded-full mr-4 flex justify-center items-center">
            <TrainIcon className="text-white transform scale-125" />
          </div>
        );
      case "Bill":
        return (
          <div className="h-12 w-12 bg-red-500 rounded-full mr-4 flex justify-center items-center">
            <ReceiptIcon className="text-white transform scale-125" />
          </div>
        );
      default:
        return <></>;
    }
  };

  const moreItemRef = useRef(null);
  useOnClickOutside(moreItemRef, () => setMoreItems(false));

  return (
    <React.Fragment>
      {index !== 0 && <hr className="my-3" />}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {handleIcon(transaction.category)}
          <div>
            <div className="text-xs">
              {String(transaction.date).split("T")[0]}
            </div>
            <div className="text-xs">
              {transaction.category}
              {transaction.subCategory && `, ${transaction.subCategory}`}
            </div>
            <div className="text-xs">{transaction.description}</div>
          </div>
        </div>
        <div
          className="relative self-stretch flex flex-col justify-between"
          ref={moreItemRef}
        >
          <ThreeDotsIcon
            className="cursor-pointer ml-auto"
            onClick={() => setMoreItems(!moreItems)}
          />
          <AnimatePresence>
            {moreItems && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bg-white shadow-lg rounded-md w-[200px] p-4 right-0 top-5 border border-gray-100 z-10"
              >
                <div>
                  <div
                    className="cursor-pointer flex justify-between items-center"
                    onClick={handleDeleteModal}
                  >
                    <p className="text-sm text-red-500">Delete</p>
                    <TrashIcon className="text-red-500" />
                  </div>
                  <hr className="my-3" />
                  <div
                    className="cursor-pointer flex justify-between items-center"
                    onClick={() => handleEdit(transaction)}
                  >
                    <p className="text-sm text-blue-500">Edit</p>
                    <PencilSquareIcon className="cursor-pointer text-blue-500" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-xs">${transaction.price}</div>
        </div>
      </div>

      <Modal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModal}
        rightButtonClassName="bg-red-500"
        rightButtonText="Delete"
        onSubmit={handleRemove}
      >
        Are you sure want to delete that permanently?
      </Modal>
    </React.Fragment>
  );
};

export default Transaction;
