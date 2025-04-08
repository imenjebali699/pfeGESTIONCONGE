
"use client";
import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'; // ✅ Correct pour App Router

interface SubscriptionRequest {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'declined';
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<SubscriptionRequest[]>([]);
  const router = useRouter(); // Hook pour redirection

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then((data: SubscriptionRequest[]) => setRequests(data))
      .catch(err => console.error(err));
  }, []);

  const handleAction = async (id: string, status: 'approved' | 'declined') => {
    const res = await fetch(`/api/subscriptions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
      toast.success(`Request ${status}`);
    } else {
      toast.error('Action failed');
    }
  };

  const handleDetailsClick = (id: string) => {
    router.push(`/admin/details/${id}`); // Redirection vers la page de détails
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid gap-4">
        {requests.map(req => (
          <Card key={req.id} className="p-4 flex justify-between items-center">
            <CardContent>
              <p><strong>{req.name}</strong> ({req.email})</p>
              <p>Status: <span className={`font-semibold ${req.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>{req.status}</span></p>
            </CardContent>
            <div className="flex gap-2">
              <Button onClick={() => handleAction(req.id, 'approved')} disabled={req.status !== 'pending'}>Approve</Button>
              <Button onClick={() => handleAction(req.id, 'declined')} disabled={req.status !== 'pending'} variant="outline">Decline</Button>
              <Button onClick={() => handleDetailsClick(req.id)} variant="outline">Details</Button> {/* Nouveau bouton */}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
