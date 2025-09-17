"use client";
import { useState, useEffect } from "react";
import FamilyTable from "../../components/FamilyTable";
import FamilyForm from "../../components/FamilyForm";
import api from "../../utils/axios";

export default function FamiliesPage() {
  const [showForm, setShowForm] = useState(false);
  const [families, setFamilies] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [familiesRes, membersRes] = await Promise.all([
        api.get("/families"),
        api.get("/members"),
      ]);
      setFamilies(familiesRes.data);
      setMembers(membersRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-pcea-black">Families Management</h2>
      <div className="mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          Register Family
        </button>
      </div>
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <FamilyTable families={families} members={members} />
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <h3 className="text-xl font-bold mb-4">Register Family</h3>
            <FamilyForm
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
