"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react"; // Icônes d'acceptation/refus

interface Conges {
  id: number;
  employe: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
}

export default function GestionConges() {
  const [demandes, setDemandes] = useState<Conges[]>([]);

  // Ajouter des exemples en attendant la connexion à la base de données
  useEffect(() => {
    const exemplesDemandes: Conges[] = [
      { id: 1, employe: "Alice Dupont", dateDebut: "2024-04-10", dateFin: "2024-04-15", statut: "En attente" },
      { id: 2, employe: "Jean Martin", dateDebut: "2024-05-01", dateFin: "2024-05-10", statut: "En attente" },
    ];
    setDemandes(exemplesDemandes);
  }, []);

  // Fonction pour accepter un congé
  const accepterConge = async (id: number) => {
    setDemandes(demandes.filter((demande) => demande.id !== id)); // Mettre à jour la liste
  };

  // Fonction pour refuser un congé
  const refuserConge = async (id: number) => {
    setDemandes(demandes.filter((demande) => demande.id !== id)); // Mettre à jour la liste
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Gestion des demandes de congés</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Employé</th>
            <th className="py-2 px-4 border">Date début</th>
            <th className="py-2 px-4 border">Date fin</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td className="py-2 px-4 border">{demande.employe}</td>
              <td className="py-2 px-4 border">{demande.dateDebut}</td>
              <td className="py-2 px-4 border">{demande.dateFin}</td>
              <td className="py-2 px-4 border flex gap-2">
                <button
                  onClick={() => accepterConge(demande.id)}
                  className="px-3 py-1 text-green-600 hover:text-white border border-green-600 rounded hover:bg-green-600"
                >
                  <CheckCircle size={20} />
                </button>
                <button
                  onClick={() => refuserConge(demande.id)}
                  className="px-3 py-1 text-red-600 hover:text-white border border-red-600 rounded hover:bg-red-600"
                >
                  <XCircle size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
