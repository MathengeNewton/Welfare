import { useState } from "react";
import { Family } from "../types/family";
import { Member } from "../types/member";

interface FamilyFormProps {
  members: Member[];
  onSubmit: (family: Omit<Family, "id">) => void;
  onCancel: () => void;
}

export default function FamilyForm({ members, onSubmit, onCancel }: FamilyFormProps) {
  const [form, setForm] = useState({
    name: "",
    memberIds: [] as string[],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, name: e.target.value }));
  }

  function handleMembersChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm((prev) => ({ ...prev, memberIds: selected }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Family Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Family Members</label>
        <select
          name="memberIds"
          multiple
          value={form.memberIds}
          onChange={handleMembersChange}
          className="w-full border rounded px-3 py-2"
        >
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <small className="text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple</small>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
