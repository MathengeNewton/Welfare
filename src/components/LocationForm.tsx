import { useState } from "react";
import { Location } from "../types/location";
import { Member } from "../types/member";

interface LocationFormProps {
  members: Member[];
  onSubmit: (location: Omit<Location, "id">) => void;
  onCancel: () => void;
}

export default function LocationForm({ members, onSubmit, onCancel }: LocationFormProps) {
  const [form, setForm] = useState({
    areaCode: "",
    name: "",
    officialIds: [] as string[],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleOfficialsChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm((prev) => ({ ...prev, officialIds: selected }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Area Code</label>
        <input
          name="areaCode"
          value={form.areaCode}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Location Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Area Officials</label>
        <select
          name="officialIds"
          multiple
          value={form.officialIds}
          onChange={handleOfficialsChange}
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
