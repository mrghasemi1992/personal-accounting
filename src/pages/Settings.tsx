import { useState } from "react";
import { motion } from "framer-motion";

import Modal from "../components/common/Modal";

import { useTransactionStore } from "../stores/transactionStore";

const Settings = () => {
  const [importModalIsOpen, setImportModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const { removeAll, importSample } = useTransactionStore();

  const handleImport = () => {
    removeAll();
    importSample();
    setImportModalIsOpen(false);
  };

  const handleDeleteAll = () => {
    removeAll();
    setDeleteModalIsOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col p-4 gap-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={() => setImportModalIsOpen(true)}
        >
          Import Sample Data
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => setDeleteModalIsOpen(true)}
        >
          Remove All Data
        </button>
      </div>

      <Modal
        isOpen={importModalIsOpen}
        setIsOpen={setImportModalIsOpen}
        rightButtonText="Import"
        rightButtonClassName="bg-red-500"
        onSubmit={handleImport}
      >
        <p className="text-red-500">
          All previous data will be replaced by the sample data. Are you sure?
        </p>
      </Modal>

      <Modal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        rightButtonText="Delete all"
        rightButtonClassName="bg-red-500"
        onSubmit={handleDeleteAll}
      >
        <p className="text-red-500">Are you sure want to delete all data?</p>
      </Modal>
    </motion.div>
  );
};

export default Settings;
