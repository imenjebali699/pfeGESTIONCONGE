"use client";
import Link from "next/link";

export default function RepartitionConges() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-gray-800">Répartition des congés</h3>
      <p className="mt-1 text-gray-500">Nombre de congés pris par département</p>

      <div className="space-y-5 mt-6">
        {/* Bouton pour Ressources Humaines */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">Ressources Humaines</p>
            <span className="block text-gray-500">15 congés pris</span>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200">
              <div
                className="absolute left-0 top-0 h-full rounded-sm bg-brand-500"
                style={{ width: `30%` }} // 15 congés pris sur 50
              ></div>
            </div>
            <p className="font-medium text-gray-800">30%</p>
          </div>

          {/* Bouton "Voir plus" pour Ressources Humaines */}
          <Link href="/rh" >
            <button className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
              Voir plus
            </button>
          </Link>
        </div>

        {/* Bouton pour Informatique */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">Informatique</p>
            <span className="block text-gray-500">8 congés pris</span>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200">
              <div
                className="absolute left-0 top-0 h-full rounded-sm bg-brand-500"
                style={{ width: `20%` }} // 8 congés pris sur 40
              ></div>
            </div>
            <p className="font-medium text-gray-800">20%</p>
          </div>

          {/* Bouton "Voir plus" pour Informatique */}
          <Link href="/info" >
            <button className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
              Voir plus
            </button>
          </Link>
        </div>

        {/* Bouton pour Marketing */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">Marketing</p>
            <span className="block text-gray-500">5 congés pris</span>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200">
              <div
                className="absolute left-0 top-0 h-full rounded-sm bg-brand-500"
                style={{ width: `16.67%` }} // 5 congés pris sur 30
              ></div>
            </div>
            <p className="font-medium text-gray-800">16.67%</p>
          </div>

          {/* Bouton "Voir plus" pour Marketing */}
          <Link href="/mark" >
            <button className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
              Voir plus
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}