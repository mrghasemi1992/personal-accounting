import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { AnimatePresence, motion } from "framer-motion";
import { useImmer } from "use-immer";

import Dropdown from "./common/Dropdown";

import { Category, NewTransaction } from "../interfaces";

import "react-datepicker/dist/react-datepicker.css";

import { ReactComponent as CloseIcon } from "../assets/icons/common/close.svg";
import { useTransactionStore } from "../stores/transactionStore";

type Props = {
  transactionIdForEdit?: number;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

const NewTransactionModal = ({
  isOpen,
  setIsOpen,
  transactionIdForEdit,
}: Props) => {
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);
  const [formData, setFormData] = useImmer<{
    data: NewTransaction;
    error: {
      date: string;
      amount: string;
      category: string;
      description: string;
    };
  }>({
    data: {
      id: Date.now(),
      date: new Date(),
      amount: "",
      category: "",
      description: "",
    },
    error: {
      date: "",
      amount: "",
      category: "",
      description: "",
    },
  });
  const { add } = useTransactionStore();

  const resetForm = () => {
    setFormData((draft) => {
      draft.data = {
        id: Date.now(),
        date: new Date(),
        amount: "",
        category: "",
        description: "",
      };
      draft.error = {
        date: "",
        amount: "",
        category: "",
        description: "",
      };
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
    setCategoryIsOpen(false);
  };

  const handleErrors = () => {
    let errorFlag = false;

    if (!formData.data.date) {
      setFormData((draft) => {
        draft.error.date = "Date is required!";
      });
      errorFlag = true;
    }
    if (!formData.data.amount) {
      setFormData((draft) => {
        draft.error.amount = "Price is required!";
      });
      errorFlag = true;
    }
    if (!formData.data.category) {
      setFormData((draft) => {
        draft.error.category = "Category is required!";
      });
      errorFlag = true;
    }

    return errorFlag;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!handleErrors()) {
      if (!transactionIdForEdit) {
        formData.data.date &&
          add({
            ...formData.data,
            date: formData.data.date.toISOString(),
            amount: String(Number(formData.data.amount) * -1),
          });
      }
      setIsOpen(false);
      setCategoryIsOpen(false);
      resetForm();
    }
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="bg-cultured p-8 fixed inset-0"
        >
          <CloseIcon
            className="ml-auto cursor-pointer w-8 h-8 text-gray-500 mb-4"
            onClick={handleClose}
          />
          <ReactDatePicker
            onChange={(value) =>
              setFormData((draft) => {
                draft.data.date = value;
              })
            }
            selected={formData.data.date}
            className="w-full rounded-xl outline-none p-4"
            placeholderText="Date"
          />
          {formData.error.date && (
            <p className="text-xs text-red-500 mt-2">{formData.error.date}</p>
          )}
          <input
            className="w-full rounded-xl outline-none p-4 mt-4"
            placeholder="Price"
            type="number"
            value={formData.data.amount}
            onChange={({ target: { value } }) =>
              setFormData((draft) => {
                draft.data.amount = value;
              })
            }
            autoFocus
          />
          {formData.error.amount && (
            <p className="text-xs text-red-500 mt-2">{formData.error.amount}</p>
          )}
          <Dropdown
            isOpen={categoryIsOpen}
            setIsOpen={setCategoryIsOpen}
            placeholder="Category"
            items={["Food", "Transportation", "Bill"]}
            value={formData.data.category}
            setValue={(value: Category) =>
              setFormData((draft) => {
                draft.data.category = value;
              })
            }
            className="mt-4"
          />
          {formData.error.category && (
            <p className="text-xs text-red-500 mt-2">
              {formData.error.category}
            </p>
          )}
          <input
            className="w-full rounded-xl outline-none p-4 my-4"
            placeholder="Description"
            type="text"
            name="description"
            value={formData.data.description}
            onChange={({ target: { value } }) =>
              setFormData((draft) => {
                draft.data.description = value;
              })
            }
          />
          <button className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white w-full h-14 rounded-xl font-semibold text-lg">
            {transactionIdForEdit ? "Edit" : "Submit"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default NewTransactionModal;
