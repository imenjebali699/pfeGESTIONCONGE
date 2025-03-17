import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Interface TypeScript pour les demandes
interface Request {
  id: number;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "Approuvée" | "En attente" | "Rejetée";
}

// Exemples de données de demandes
const requestsData: Request[] = [
  {
    id: 1,
    employee: "Amine Ben Salah",
    type: "Congé annuel",
    startDate: "2024-04-10",
    endDate: "2024-04-20",
    status: "Approuvée",
  },
  {
    id: 2,
    employee: "Nadia Trabelsi",
    type: "Congé maladie",
    startDate: "2024-03-15",
    endDate: "2024-03-18",
    status: "En attente",
  },
  {
    id: 3,
    employee: "Karim Jebali",
    type: "Congé sans solde",
    startDate: "2024-05-01",
    endDate: "2024-05-10",
    status: "Rejetée",
  },
];

export default function RecentRequests() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Demandes récentes
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start">
                Employé
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start">
                Type
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start">
                Début
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start">
                Fin
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start">
                Statut
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {requestsData.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="py-3">{request.employee}</TableCell>
                <TableCell className="py-3">{request.type}</TableCell>
                <TableCell className="py-3">{request.startDate}</TableCell>
                <TableCell className="py-3">{request.endDate}</TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={
                      request.status === "Approuvée"
                        ? "success"
                        : request.status === "En attente"
                        ? "warning"
                        : "error"
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
