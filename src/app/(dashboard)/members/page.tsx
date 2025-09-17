"use client";
import { useState, useEffect } from "react";
import MemberTable from "@/components/MemberTable";
import MemberForm from "@/components/MemberForm";
import api from "@/utils/axios";

export default function MembersPage() {
  const [showForm, setShowForm] = useState(false);
  const [members, setMembers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [membersRes, locationsRes] = await Promise.all([
        api.get("/members"),
        api.get("/locations"),
      ]);
      setMembers(membersRes.data);
      setLocations(locationsRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-6 text-pcea-black">Members Management</h2>
      <div className="mb-4">
        <button
          className="bg-pcea-gold text-pcea-blue font-bold px-6 py-2 rounded shadow hover:bg-pcea-red hover:text-pcea-white transition-colors"
          onClick={() => setShowForm(true)}
        >
          Register Member
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <MemberTable members={members} locations={locations} />
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-lg">
            <div className="bg-white border-4 border-pcea-gold rounded-2xl shadow-2xl p-8 pt-10 relative animate-fadeIn">
              <button
                className="absolute top-4 right-4 text-pcea-red hover:text-pcea-blue text-2xl font-bold focus:outline-none"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-2xl font-extrabold mb-6 text-pcea-blue">Register Member</h3>
              <MemberForm
                locations={locations}
                onSubmit={() => setShowForm(false)}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
