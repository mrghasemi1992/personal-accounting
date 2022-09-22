import { useState } from "react";

import Modal from "../components/common/Modal";

import sampleData from "../data/sampleData.json";

const Settings = () => {
  const [importModalIsOpen, setImportModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const handleImport = () => {
    localStorage.removeItem("transactions");
    localStorage.setItem("transactions", JSON.stringify(sampleData));
    setImportModalIsOpen(false);
  };

  const handleDeleteAll = () => {
    localStorage.removeItem("transactions");
    setDeleteModalIsOpen(false);
  };

  return (
    <>
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
    </>
  );
};

export default Settings;
