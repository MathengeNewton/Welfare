"use client";
import { useState, useEffect } from "react";
import ContributionTable from "@/components/ContributionTable";
import ContributionForm from "@/components/ContributionForm";
import api from "@/utils/axios";

export default function ContributionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [contributions, setContributions] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [contributionsRes, membersRes] = await Promise.all([
        api.get("/contributions"),
        api.get("/members"),
      ]);
      setContributions(contributionsRes.data);
      setMembers(membersRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-6 text-pcea-black">Contributions Management</h2>
      <div className="mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          Add Contribution
        </button>
      </div>
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <ContributionTable contributions={contributions} members={members} />
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <h3 className="text-xl font-bold mb-4">Add Contribution</h3>
            <ContributionForm
              members={members}
              onSubmit={() => setShowForm(false)}
              onCancel={() => setShowForm(false)}
            />
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
