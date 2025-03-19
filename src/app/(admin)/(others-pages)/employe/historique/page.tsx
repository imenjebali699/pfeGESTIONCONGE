export default function HistoriqueDemandes() {
  // Exemple de données - Remplacez avec des données dynamiques
  const demandes = [
    { id: 1, date: "2025-02-15", status: "Approuvé", debut: "2025-03-01", fin: "2025-03-05" },
    { id: 2, date: "2025-02-20", status: "Refusé", debut: "2025-03-10", fin: "2025-03-15" },
    { id: 3, date: "2025-02-25", status: "En attente", debut: "2025-03-20", fin: "2025-03-25" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Historique des demandes</h1>
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Date de soumission</th>
              <th className="p-2 text-left">Début</th>
              <th className="p-2 text-left">Fin</th>
              <th className="p-2 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id} className="border-t">
                <td className="p-2">{demande.date}</td>
                <td className="p-2">{demande.debut}</td>
                <td className="p-2">{demande.fin}</td>
                <td className={`p-2 font-semibold ${
                  demande.status === "Approuvé" ? "text-green-500" :
                  demande.status === "Refusé" ? "text-red-500" : "text-orange-500"
                }`}>{demande.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
