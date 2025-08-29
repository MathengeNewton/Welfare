"use client";
import { useState } from "react";
import LocationTable from "../../components/LocationTable";
import LocationForm from "../../components/LocationForm";
import { mockLocations } from "../../mock/locations";
import { mockMembers } from "../../mock/members";

export default function LocationsPage() {
  const [showForm, setShowForm] = useState(false);
  // In a real app, use state for locations and update on submit

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Locations Management</h2>
      <div className="mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          Add Location
        </button>
      </div>
      <LocationTable locations={mockLocations} members={mockMembers} />
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <h3 className="text-xl font-bold mb-4">Add Location</h3>
            <LocationForm
              members={mockMembers}
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
