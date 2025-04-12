"use client"; // Ensure it's a client component

import {  useParams } from 'next/navigation'; // Import useRouter and useParams at the top level
import { useEffect, useState } from 'react';

interface Request {
  id: string;
  name: string;
  email: string;
  status: string;
}

const DetailsPage = () => {
  const { id } = useParams(); // Use useParams to get the dynamic id

  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID is missing from the URL.');
      setLoading(false);
      return;
    }

    // Fetch data based on the dynamic ID (simulating API call)
    fetch(`/api/requests/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: Request) => {
        setRequest(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!request) return <p>Request not found.</p>;

  return (
    <div>
      <h1>{request.name}</h1>
      <p>Email: {request.email}</p>
      <p>Status: {request.status}</p>
    </div>
  );
};

export default DetailsPage;
