"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";

export default function GestionDemandes() {
  const [demandes, setDemandes] = useState([
    {
      id: 1,
      nom: "Imen Jebali",
      typeConge: "Congé annuel",
      nombreJours: 5,
      dateDebut: "2025-04-01",
      heureDebut: "09:00",
      dateFin: "2025-04-06",
      heureFin: "17:00",
      justificatif: "justificatif.pdf",
      statut: "En attente",
    },
    {
      id: 2,
      nom: "Asma Laabidi",
      typeConge: "Congé maladie",
      nombreJours: 3,
      dateDebut: "2025-03-15",
      heureDebut: "08:30",
      dateFin: "2025-03-18",
      heureFin: "16:30",
      justificatif: "certificat_medical.pdf",
      statut: "En attente",
    },
    {
      id: 3,
      nom: "Mohamed Ali",
      typeConge: "Congé annuel",
      nombreJours: 7,
      dateDebut: "2025-05-10",
      heureDebut: "10:00",
      dateFin: "2025-05-17",
      heureFin: "18:00",
      justificatif: "-",
      statut: "Approuvé",
    },
    {
      id: 4,
      nom: "Sarah Ben Salah",
      typeConge: "Autre",
      nombreJours: 2,
      dateDebut: "2025-06-05",
      heureDebut: "09:45",
      dateFin: "2025-06-07",
      heureFin: "14:30",
      justificatif: "autorisation_speciale.pdf",
      statut: "Rejeté",
    },
    {
      id: 5,
      nom: "Ahmed Khemiri",
      typeConge: "Congé parental",
      nombreJours: 10,
      dateDebut: "2025-07-01",
      heureDebut: "07:30",
      dateFin: "2025-07-11",
      heureFin: "17:00",
      justificatif: "demande_parental.pdf",
      statut: "En attente",
    }
  ]);

  const updateStatut = (id: number, newStatut: string) => {
    setDemandes((prev) =>
      prev.map((demande) =>
        demande.id === id ? { ...demande, statut: newStatut } : demande
      )
    );
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Gestion des Demandes de Congés" />
      <ComponentCard title="Liste des demandes">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nom</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Jours</th>
              <th className="border p-2">Début</th>
              <th className="border p-2">Heure Début</th>
              <th className="border p-2">Fin</th>
              <th className="border p-2">Heure Fin</th>
              <th className="border p-2">Justificatif</th>
              <th className="border p-2">Statut</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id} className="text-center">
                <td className="border p-2">{demande.nom}</td>
                <td className="border p-2">{demande.typeConge}</td>
                <td className="border p-2">{demande.nombreJours}</td>
                <td className="border p-2">{demande.dateDebut}</td>
                <td className="border p-2">{demande.heureDebut}</td>
                <td className="border p-2">{demande.dateFin}</td>
                <td className="border p-2">{demande.heureFin}</td>
                <td className="border p-2">
                  {demande.justificatif !== "-" ? (
                    <a
                      href={`/${demande.justificatif}`}
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Voir
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border p-2 font-semibold">{demande.statut}</td>
                <td className="border p-2 space-x-2">
                  <Button
                    onClick={() => updateStatut(demande.id, "Approuvé")}
                    className="bg-green-500 text-white px-4 py-1 rounded"
                  >
                    Approuver
                  </Button>
                  <Button
                    onClick={() => updateStatut(demande.id, "Rejeté")}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Rejeter
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ComponentCard>
    </div>
  );
}
