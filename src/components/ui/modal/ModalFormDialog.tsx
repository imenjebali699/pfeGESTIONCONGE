"use client";
import React, { useState, FormEvent } from "react";

interface Employee {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  post: string;
  department?: string;
  etatinscript: "EN_ATTENTE" | "ACCEPTE" | "REJETE";
  role?: string;
  dateInscription?: string;
}

interface ModalFormDialogProps {
  isOpen: boolean;
  employee: Employee;
  onClose: () => void;
  onAccept: (data: { role: string }) => void;
  initialRole?: string;
}

const ModalFormDialog: React.FC<ModalFormDialogProps> = ({
  isOpen,
  employee,
  onClose,
  onAccept,
  initialRole = "EMPLOYEE",
}) => {
  const [role, setRole] = useState(initialRole);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAccept({ role });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl dark:bg-gray-800 transform transition-all duration-300 mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Modifier le rôle de l'employé
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Fermer</span>
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-6">
            {/* Informations de l'employé */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">ID :</span> {employee.id}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Nom :</span> {employee.nom}{" "}
                {employee.prenom}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Email :</span> {employee.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Poste :</span> {employee.post}
              </p>
              {employee.department && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Département :</span> {employee.department}
                </p>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Statut :</span> {employee.etatinscript}
              </p>
            </div>

            {/* Sélection du rôle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Modifier le rôle :
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="EMPLOYEE">Employé</option>
                <option value="MANAGER">Manager</option>
                <option value="RESPONSABLE_RH">Responsable RH</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Accepter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFormDialog;
