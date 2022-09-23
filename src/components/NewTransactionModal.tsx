import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { motion } from "framer-motion";
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
            text: "New transaction was added successfully.",
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
            text: "Transaction was edited successfully.",
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
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer={false}
      crossButton={false}
      wrapperClassName="bg-white rounded-md mt-10 mx-4 p-4"
    >
      <motion.form onSubmit={handleSubmit}>
        <CloseIcon className="ml-auto cursor-pointer" onClick={handleClose} />
        <ReactDatePicker
          onChange={(value) =>
            setFormData((draft) => {
              draft.data.date = value;
            })
          }
          selected={formData.data.date}
          className="w-full border rounded-md border-gray-300 outline-none px-3 py-2 mt-4 mb-1"
          placeholderText="Date"
        />
        {formData.error.date && (
          <p className="text-xs text-red-500">{formData.error.date}</p>
        )}
        <input
          className="w-full border rounded-md border-gray-300 outline-none px-3 py-2 mt-2 mb-1"
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
          className="w-full border rounded-md border-gray-300 outline-none px-3 py-2 mt-2 mb-1"
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
        <button className="bg-blue-600 text-white w-full px-8 py-2 rounded-md mt-6 mb-2">
          {transactionIdForEdit ? "Edit" : "Submit"}
        </button>
      </motion.form>
    </Modal>
  );
};

export default NewTransactionModal;
