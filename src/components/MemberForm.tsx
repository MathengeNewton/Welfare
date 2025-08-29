import { useState } from "react";
import { Member } from "../types/member";
import { Location } from "../types/location";

interface MemberFormProps {
  locations: Location[];
  onSubmit: (member: Omit<Member, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export default function MemberForm({ locations, onSubmit, onCancel }: MemberFormProps) {
  const [form, setForm] = useState({
    membershipNumber: "",
    name: "",
    kyc: { dob: "", idNumber: "", phone: "", email: "" },
    locationId: locations[0]?.id || "",
    familyId: undefined,
    isOfficial: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name.startsWith("kyc.")) {
      setForm((prev) => ({
        ...prev,
        kyc: { ...prev.kyc, [name.split(".")[1]]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Membership Number</label>
        <input
          name="membershipNumber"
          value={form.membershipNumber}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Date of Birth</label>
        <input
          name="kyc.dob"
          type="date"
          value={form.kyc.dob}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">ID Number</label>
        <input
          name="kyc.idNumber"
          value={form.kyc.idNumber}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          name="kyc.phone"
          value={form.kyc.phone}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          name="kyc.email"
          type="email"
          value={form.kyc.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Location</label>
        <select
          name="locationId"
          value={form.locationId}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Register
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
