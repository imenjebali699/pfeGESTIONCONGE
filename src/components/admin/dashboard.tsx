"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Button from "@/components/ui/button/Button";
import { Card, CardContent } from "@/components/ui/card/card";
import { useAuth } from "@/context/AuthContext";
import ModalFormDialog from "../ui/modal/ModalFormDialog";
import RejectionModal from "../ui/modal/RejectionModal";

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

export default function AdminDashboard() {
  const [requests, setRequests] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [roleToAssign, setRoleToAssign] = useState("EMPLOYEE");

  const { user } = useAuth();
  const router = useRouter();

  // Vérification du rôle ADMIN
  useEffect(() => {
    if (!user) return;
    if (user.role.toUpperCase() !== "ADMIN") {
      toast.error("Accès refusé");
      router.push("/");
    }
  }, [user, router]);

  const fetchPendingRequests = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentification requise");
        router.push("/login");
        return;
      }
      const response = await fetch("http://localhost:8081/api/admin/pending", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Échec de la récupération des demandes");
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Erreur :", error);
      toast.error(
        error instanceof Error ? error.message : "Erreur lors du chargement"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion de l'approbation avec modification du rôle
  const handleApprove = async (data: { role: string }) => {
    if (!selectedEmployee) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/api/admin/gerereinscription", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeId: selectedEmployee.id,
          accept: true,
          role: data.role,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'approbation");
      }
      toast.success("Employé approuvé");
      setShowApprovalModal(false);
      setSelectedEmployee(null);
      setRoleToAssign("EMPLOYEE");
      fetchPendingRequests();
    } catch (error) {
      console.error("Erreur :", error);
      toast.error(
        error instanceof Error ? error.message : "Erreur d'approbation"
      );
    }
  };

  // Gestion du rejet
  const handleReject = async () => {
    if (!selectedEmployee) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/api/admin/gerereinscription", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeId: selectedEmployee.id,
          accept: false,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors du rejet");
      }
      toast.success(
        `Vous avez supprimé l'employé ${selectedEmployee.prenom} ${selectedEmployee.nom}`
      );
      setShowRejectionModal(false);
      setSelectedEmployee(null);
      fetchPendingRequests();
    } catch (error) {
      console.error("Erreur :", error);
      toast.error(
        error instanceof Error ? error.message : "Erreur de rejet"
      );
    }
  };

  useEffect(() => {
    if (user?.role.toUpperCase() === "ADMIN") {
      fetchPendingRequests();
    }
  }, [user]);

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Admin</h1>
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : requests.length === 0 ? (
        <p>Aucune demande en attente</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((employee) => (
            <Card
              key={employee.id}
              className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <CardContent className="flex-1">
                <h3 className="font-bold">
                  {employee.prenom} {employee.nom}
                </h3>
                <p className="text-gray-600">{employee.post}</p>
                <p className="text-gray-600">{employee.department}</p>
                <p className="text-gray-600">{employee.email}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      employee.etatinscript === "ACCEPTE"
                        ? "bg-green-500"
                        : employee.etatinscript === "REJETE"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  ></span>
                  <span>Statut : {employee.etatinscript}</span>
                </div>
              </CardContent>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setRoleToAssign(employee.role || "EMPLOYEE");
                    setShowApprovalModal(true);
                  }}
                  disabled={employee.etatinscript !== "EN_ATTENTE"}
                  className="w-full md:w-auto"
                >
                  Approuver
                </Button>
                <Button
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setShowRejectionModal(true);
                  }}
                  disabled={employee.etatinscript !== "EN_ATTENTE"}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  Rejeter
                </Button>
               
              </div>
            </Card>
          ))}
        </div>
      )}
      {/* Modal d'approbation avec formulaire */}
      {selectedEmployee && (
        <ModalFormDialog
          isOpen={showApprovalModal}
          employee={selectedEmployee}
          initialRole={roleToAssign}
          onClose={() => setShowApprovalModal(false)}
          onAccept={handleApprove}
        />
      )}
      {/* Modal de rejet */}
      {selectedEmployee && (
        <RejectionModal
          isOpen={showRejectionModal}
          employee={selectedEmployee}
          onClose={() => setShowRejectionModal(false)}
          onConfirm={handleReject}
        />
      )}
    </div>
  );
}
