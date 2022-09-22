import { useState } from "react";

import Modal from "../components/common/Modal";

import sampleData from "../data/sampleData.json";

const Settings = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleImport = () => {
    localStorage.removeItem("transactions");
    localStorage.setItem("transactions", JSON.stringify(sampleData));
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="p-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={() => setModalIsOpen(true)}
        >
          Import Sample Data
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        rightButtonText="Import"
        rightButtonClassName="bg-red-500"
        onSubmit={handleImport}
      >
        <p className="text-red-500">
          All previous data will be replaced by the sample data. Are you sure?
        </p>
      </Modal>
    </>
  );
};

export default Settings;
