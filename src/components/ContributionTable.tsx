import { Contribution } from "../types/contribution";
import { Member } from "../types/member";

interface ContributionTableProps {
  contributions: Contribution[];
  members: Member[];
}

export default function ContributionTable({ contributions, members }: ContributionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Member</th>
            <th className="px-4 py-2 text-left">Month</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((c) => {
            const member = members.find((m) => m.id === c.memberId);
            return (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-2">{member ? member.name : "-"}</td>
                <td className="px-4 py-2">{c.month}</td>
                <td className="px-4 py-2">{c.amount}</td>
                <td className="px-4 py-2">{c.createdAt}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
