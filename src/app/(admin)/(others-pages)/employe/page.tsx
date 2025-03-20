import Link from "next/link";
import { FaClock, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaHistory, FaPlusCircle } from "react-icons/fa";

export default function EmployeeDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Titre */}
      <h1 className="text-4xl font-bold text-gray-800 text-center">Tableau de bord - Employé</h1>

      {/* Statistiques sous forme de cartes stylées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Congés restants */}
        <div className="p-6 bg-blue-100 text-blue-800 rounded-2xl shadow-md flex items-center space-x-4">
          <FaCalendarAlt className="text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">Congés restants</h2>
            <p className="text-3xl font-bold">12 jours</p>
          </div>
        </div>

        {/* Demandes en attente */}
        <div className="p-6 bg-orange-100 text-orange-800 rounded-2xl shadow-md flex items-center space-x-4">
          <FaClock className="text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">Demandes en attente</h2>
            <p className="text-3xl font-bold">2</p>
          </div>
        </div>

        {/* Congés approuvés */}
        <div className="p-6 bg-green-100 text-green-800 rounded-2xl shadow-md flex items-center space-x-4">
          <FaCheckCircle className="text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">Congés approuvés</h2>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>

        {/* Demandes refusées */}
        <div className="p-6 bg-red-100 text-red-800 rounded-2xl shadow-md flex items-center space-x-4">
          <FaTimesCircle className="text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">Demandes refusées</h2>
            <p className="text-3xl font-bold">1</p>
          </div>
        </div>

        {/* Prochain congé prévu */}
        <div className="p-6 bg-purple-100 text-purple-800 rounded-2xl shadow-md flex items-center space-x-4">
          <FaCalendarAlt className="text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">Prochain congé prévu</h2>
            <p className="text-3xl font-bold">10 - 15 Avril</p>
          </div>
        </div>

        {/* Taux d'acceptation */}
        <div className="p-6 bg-teal-100 text-teal-800 rounded-2xl shadow-md flex items-center space-x-4">
          <FaCheckCircle className="text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">Taux d&apos;acceptation</h2>
            <p className="text-3xl font-bold">85%</p>
          </div>
        </div>
      </div>

      {/* Historique des actions */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <FaHistory className="text-gray-700" /> <span>Historique des actions</span>
        </h2>
        <ul className="text-gray-700 space-y-3">
          <li className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500" />
            <span>Congé approuvé du 10 au 15 Avril</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaClock className="text-orange-500" />
            <span>Demande en attente (20 - 25 Mai)</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaTimesCircle className="text-red-500" />
            <span>Demande refusée (5 - 8 Mars)</span>
          </li>
        </ul>
      </div>

      {/* Boutons d'actions */}
      <div className="flex justify-center space-x-4">
        <Link href="employe/historique">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md flex items-center space-x-2 hover:bg-blue-600 transition">
            <FaHistory /> <span>Voir mes demandes</span>
          </button>
        </Link>

        <Link href="/calendar">
          <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-md flex items-center space-x-2 hover:bg-green-600 transition">
            <FaPlusCircle /> <span>Nouvelle demande</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
