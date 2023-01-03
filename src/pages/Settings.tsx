import { useState } from "react";

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
    <div className="p-6">
      <div className="flex flex-col gap-y-4">
        <button
          className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-4 py-3 rounded-xl"
          onClick={() => setImportModalIsOpen(true)}
        >
          Import Sample Data
        </button>
        <button
          className="bg-gradient-to-l from-red-300 to-red-600 text-white px-4 py-3 rounded-xl"
          onClick={() => setDeleteModalIsOpen(true)}
        >
          Remove All Data
        </button>
      </div>

      <Modal
        isOpen={importModalIsOpen}
        setIsOpen={setImportModalIsOpen}
        rightButtonText="Import"
        rightButtonClassName="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
        onSubmit={handleImport}
      >
        <p className="text-indigo-500">
          All previous data will be{" "}
          <span className="border-b-red-400 inline-block border-b-2 border-dashed">
            replaced by
          </span>{" "}
          the sample data. Are you sure?
        </p>
      </Modal>

      <Modal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        rightButtonText="Delete all"
        rightButtonClassName="bg-gradient-to-l from-red-300 to-red-600"
        onSubmit={handleDeleteAll}
      >
        <p className="text-indigo-500">
          Are you sure want to{" "}
          <span className="border-b-red-400 inline-block border-b-2 border-dashed">
            delete all
          </span>{" "}
          data?
        </p>
      </Modal>
    </div>
  );
};

export default Settings;
