import { Family } from "../types/family";
import { Member } from "../types/member";

interface FamilyTableProps {
  families: Family[];
  members: Member[];
}

export default function FamilyTable({ families, members }: FamilyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Family Name</th>
            <th className="px-4 py-2 text-left">Members</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {families.map((fam) => (
            <tr key={fam.id} className="border-t">
              <td className="px-4 py-2">{fam.name}</td>
              <td className="px-4 py-2">
                {fam.memberIds.map((mid) => {
                  const member = members.find((m) => m.id === mid);
                  return member ? (
                    <span key={mid} className="inline-block mr-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {member.name}
                    </span>
                  ) : null;
                })}
              </td>
              <td className="px-4 py-2">
                <button className="text-blue-600 hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
