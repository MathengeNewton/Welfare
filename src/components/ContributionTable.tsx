import { Contribution } from "../types/contribution";
import { Member } from "../types/member";

interface ContributionTableProps {
  contributions: Contribution[];
  members: Member[];
}

export default function ContributionTable({ contributions, members }: ContributionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-pcea-blue text-pcea-gold">
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Member</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Month</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Amount</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Date</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((c, idx) => {
            const member = members.find((m) => m.id === c.memberId);
            return (
              <tr key={c.id} className={idx % 2 === 0 ? "bg-pcea-white" : "bg-gray-50"}>
                <td className="px-4 py-2 text-gray-900 font-semibold">{member ? member.name : "-"}</td>
                <td className="px-4 py-2 text-gray-900 font-semibold">{c.month}</td>
                <td className="px-4 py-2 text-gray-900 font-semibold">{c.amount}</td>
                <td className="px-4 py-2 text-gray-900">{c.createdAt}</td>
                <td className="px-4 py-2">
                  <button className="text-pcea-blue hover:text-pcea-gold font-bold underline">Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
