import Link from "next/link";
import { Family } from "../types/family";
import { Member } from "../types/member";

interface FamilyTableProps {
  families: Family[];
  members: Member[];
}

function getFamilyHead(family: Family, members: Member[]) {
  // For demo, pick the first member as head
  const head = members.find((m) => m.id === family.memberIds[0]);
  return head ? head.name : "-";
}

export default function FamilyTable({ families, members }: FamilyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-pcea-blue text-pcea-gold">
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Family Name</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Family Head</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Member Count</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Status</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {families.map((fam, idx) => {
            const head = getFamilyHead(fam, members);
            const count = fam.memberIds.length;
            const status = count > 0 ? "Active" : "Inactive";
            return (
              <tr key={fam.id} className={idx % 2 === 0 ? "bg-pcea-white" : "bg-gray-50"}>
                <td className="px-4 py-2 text-gray-900 font-semibold">{fam.name}</td>
                <td className="px-4 py-2 text-gray-900">{head}</td>
                <td className="px-4 py-2 text-gray-900 text-center">{count}</td>
                <td className="px-4 py-2">
                  <span className={status === "Active" ? "bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold" : "bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-semibold"}>{status}</span>
                </td>
                <td className="px-4 py-2">
                  <Link href={`/families/${fam.id}`} className="text-pcea-blue hover:text-pcea-gold font-bold underline">View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
