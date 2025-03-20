"use client"; // Indique que ce composant est côté client

import Link from "next/link";

export default function MarkComponent() {
  // Données statiques pour les employés
  const employes = [
    {
      nom: "Leila Ben Youssef",
      congesPris: 3,
      congesRefuses: 1,
      congesEnAttente: 2,
      poste: "Chef de projet Marketing",
    },
    {
      nom: "Karim Bouazizi",
      congesPris: 1,
      congesRefuses: 0,
      congesEnAttente: 4,
      poste: "Spécialiste en communication",
    },
    {
      nom: "Nadia Hammami",
      congesPris: 5,
      congesRefuses: 2,
      congesEnAttente: 1,
      poste: "Analyste de marché",
    },
  ];

  // Statistiques des congés
  const totalCongesPris = employes.reduce((total, emp) => total + emp.congesPris, 0);
  const totalCongesRefuses = employes.reduce((total, emp) => total + emp.congesRefuses, 0);
  const totalCongesEnAttente = employes.reduce((total, emp) => total + emp.congesEnAttente, 0);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold text-gray-800">Tableau de bord - Marketing</h1>
      <p className="mt-2 text-gray-600">
        Gestion des congés et des employés du département du Marketing.
      </p>

      {/* Statistiques des congés */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">Statistiques des congés</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Congés pris</p>
            <p className="text-2xl font-bold text-gray-800">{totalCongesPris}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Congés refusés</p>
            <p className="text-2xl font-bold text-gray-800">{totalCongesRefuses}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Congés en attente</p>
            <p className="text-2xl font-bold text-gray-800">{totalCongesEnAttente}</p>
          </div>
        </div>
      </div>

      {/* Liste des employés avec leurs congés */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">Liste des employés</h2>
        <div className="mt-4 space-y-3">
          {employes.map((emp, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p className="font-semibold text-gray-800">{emp.nom}</p>
              <p className="text-gray-600">{emp.poste}</p>
              <div className="flex gap-4 mt-2">
                <p className="text-gray-600">Congés pris : {emp.congesPris}</p>
                <p className="text-gray-600">Congés refusés : {emp.congesRefuses}</p>
                <p className="text-gray-600">Congés en attente : {emp.congesEnAttente}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mt-6 space-y-3">
        <Link href="/basic-tables/departement/mark/rapport" passHref>
          <button className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded hover:bg-purple-600">
            Générer un rapport
          </button>
        </Link>
      </div>

      {/* Bouton pour retourner à la page précédente */}
      <div className="mt-6">
        <Link href="/Managerdashboard" passHref>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
            Retour
          </button>
        </Link>
      </div>
    </div>
  );
}