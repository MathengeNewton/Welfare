"use client";
import { useState } from "react";
import MemberTable from "../../components/MemberTable";
import MemberForm from "../../components/MemberForm";
import { mockMembers } from "../../mock/members";
import { mockLocations } from "../../mock/locations";

export default function MembersPage() {
  const [showForm, setShowForm] = useState(false);
  // In a real app, use state for members and update on submit

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Members Management</h2>
      <div className="mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          Register Member
        </button>
      </div>
      <MemberTable members={mockMembers} locations={mockLocations} />
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <h3 className="text-xl font-bold mb-4">Register Member</h3>
            <MemberForm
              locations={mockLocations}
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
