import { useState } from "react";
import { Contribution } from "../types/contribution";
import { Member } from "../types/member";

interface ContributionFormProps {
  members: Member[];
  onSubmit: (contribution: Omit<Contribution, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export default function ContributionForm({ members, onSubmit, onCancel }: ContributionFormProps) {
  const [form, setForm] = useState({
    memberId: members[0]?.id || "",
    month: "",
    amount: 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "amount" ? Number(value) : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Member</label>
        <select
          name="memberId"
          value={form.memberId}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Month</label>
        <input
          name="month"
          type="month"
          value={form.month}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          name="amount"
          type="number"
          min={0}
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
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
