"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Employe = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  post: string;
  department: string;
  role: string;
  etatinscript: string;
  statut: string;
};

export default function EmployesAcceptes() {
  const [employes, setEmployes] = useState<Employe[]>([]);

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/admin/accepted", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data: Employe[] = res.data;

        // Exclure les employés ayant le rôle ADMIN
        const filtered = data.filter(emp => emp.role !== "ADMIN");
        setEmployes(filtered);
      } catch (err) {
        console.error("Erreur lors de la récupération des employés :", err);
      }
    };

    fetchEmployes();
  }, []);

  // Couleurs pour le badge du statut
  const statutColors: Record<string, string> = {
    ACTIF: "bg-green-100 text-green-700 border border-green-400",
    BLOQUE: "bg-red-100 text-red-700 border border-red-400",
    SUPPRIME: "bg-gray-100 text-gray-700 border border-gray-400",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Liste des employés acceptés (hors Admins)
      </h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Prénom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Poste</th>
              <th className="p-3 text-left">Département</th>
              <th className="p-3 text-left">Rôle</th>
              <th className="p-3 text-left">État d&apos;inscription</th>
              <th className="p-3 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {employes.map((employe, index) => (
              <tr
                key={`${employe.id}-${index}`}
                className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="p-3 text-gray-700">{employe.nom}</td>
                <td className="p-3 text-gray-700">{employe.prenom}</td>
                <td className="p-3 text-gray-700">{employe.email}</td>
                <td className="p-3 text-gray-700">{employe.post}</td>
                <td className="p-3 text-gray-700">{employe.department}</td>
                <td className="p-3 text-gray-700">{employe.role}</td>
                <td className="p-3 text-gray-700 font-medium">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      employe.etatinscript === "ACCEPTE"
                        ? "bg-green-100 text-green-700 border border-green-400"
                        : "bg-gray-100 text-gray-600 border"
                    }`}
                  >
                    {employe.etatinscript}
                  </span>
                </td>
                <td className="p-3 text-gray-700 font-medium">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      statutColors[employe.statut] || "bg-gray-100 text-gray-600 border"
                    }`}
                  >
                    {employe.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
