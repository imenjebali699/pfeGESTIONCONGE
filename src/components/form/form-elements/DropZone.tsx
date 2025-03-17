"use client";
import React, { useState } from "react";

import { modaluser as ModalUser } from "@/components/ui/modal/modeluser";

const ModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAccept = () => {
    alert("You accepted the terms!");
    handleCloseModal();
  };

  const handleDecline = () => {
    alert("annuler conge");
    handleCloseModal();
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
       Confirmer
      </button>

      <ModalUser
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </div>
  );
};

export default ModalExample;