import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { AnimatePresence, motion } from "framer-motion";
import { Updater } from "use-immer";

import Dropdown from "./common/Dropdown";
import Modal from "./common/Modal";

import { Category, Transaction } from "../interfaces";

import "react-datepicker/dist/react-datepicker.css";

import { ReactComponent as CloseIcon } from "../assets/icons/common/close.svg";
import { useToastContext } from "../App";

type Props = {
  transactionIdForEdit?: number;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  setTransactions: (transactions: Transaction[]) => void;
  transactions: Transaction[] | undefined;
  formData: {
    data: Transaction;
    error: {
      date: string;
      price: string;
      category: string;
      subCategory: string;
      description: string;
    };
  };
  setFormData: Updater<{
    data: Transaction;
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

const NewTransactionModal = ({
  isOpen,
  setIsOpen,
  setTransactions,
  transactions,
  formData,
  setFormData,
  transactionIdForEdit,
  setTransactionIdForEdit,
}: Props) => {
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);
  const [subCategoryIsOpen, setSubCategoryIsOpen] = useState(false);
  const [subCategoryList, setSubCategoryList] = useState<string[]>([]);
  const { toasts, setToasts } = useToastContext();

  const resetForm = () => {
    setFormData((draft) => {
      draft.data = {
        id: Date.now(),
        date: new Date(),
        price: "",
        category: "",
        subCategory: "",
        description: "",
      };
      draft.error = {
        date: "",
        price: "",
        category: "",
        subCategory: "",
        description: "",
      };
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
    setCategoryIsOpen(false);
    setSubCategoryIsOpen(false);
  };

  const handleErrors = () => {
    let errorFlag = false;

    if (!formData.data.date) {
      setFormData((draft) => {
        draft.error.date = "Date is required!";
      });
      errorFlag = true;
    }
    if (!formData.data.price) {
      setFormData((draft) => {
        draft.error.price = "Price is required!";
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
        transactions && setTransactions([...transactions, formData.data]);
        setToasts([
          ...toasts,
          {
            state: true,
            text: "New transaction added.",
            type: "success",
          },
        ]);
      } else {
        const foundIndex = transactions
          ? transactions.findIndex((item) => item.id === transactionIdForEdit)
          : -1;
        transactions &&
          setTransactions([
            ...transactions.slice(0, foundIndex),
            formData.data,
            ...transactions.slice(foundIndex + 1),
          ]);
        setToasts([
          ...toasts,
          {
            state: true,
            text: "Transaction edited.",
            type: "success",
          },
        ]);
      }
      setIsOpen(false);
      setCategoryIsOpen(false);
      setSubCategoryIsOpen(false);
      resetForm();
    }
  };

  const handleSubCategoryItems = (item: string) => {
    switch (item) {
      case "Food":
        return setSubCategoryList(["Restaurant", "Supermarket"]);
      case "Transportation":
        return setSubCategoryList(["Taxi", "Metro", "Bus"]);
      case "Bill":
        return setSubCategoryList([
          "Water",
          "Electric",
          "Gas",
          "Tel",
          "Internet",
          "Cell Phone",
        ]);
    }
  };

  useEffect(() => {
    handleSubCategoryItems(formData.data.category);
  }, [formData.data.category]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setTransactionIdForEdit(0);
  }, [isOpen, setTransactionIdForEdit]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.form
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -500 }}
          onSubmit={handleSubmit}
          className="bg-cultured p-8 fixed inset-0 flex flex-col gap-y-4"
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
            <p className="text-xs text-red-500">{formData.error.date}</p>
          )}
          <input
            className="w-full rounded-xl outline-none p-4"
            placeholder="Price"
            type="number"
            value={formData.data.price}
            onChange={({ target: { value } }) =>
              setFormData((draft) => {
                draft.data.price = value;
              })
            }
            autoFocus
          />
          {formData.error.price && (
            <p className="text-xs text-red-500">{formData.error.price}</p>
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
          />
          {formData.error.category && (
            <p className="text-xs text-red-500">{formData.error.category}</p>
          )}
          <Dropdown
            isOpen={subCategoryIsOpen}
            setIsOpen={setSubCategoryIsOpen}
            placeholder="SubCategory"
            items={subCategoryList}
            value={formData.data.subCategory}
            setValue={(value: string) =>
              setFormData((draft) => {
                draft.data.subCategory = value;
              })
            }
            disable={!formData.data.category}
          />
          <input
            className="w-full rounded-xl outline-none p-4"
            placeholder="Description"
            type="text"
            name="price"
            value={formData.data.description}
            onChange={({ target: { value } }) =>
              setFormData((draft) => {
                draft.data.description = value;
              })
            }
          />
          <button className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white w-full h-14 rounded-xl mt-auto font-semibold text-lg">
            {transactionIdForEdit ? "Edit" : "Submit"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default NewTransactionModal;
