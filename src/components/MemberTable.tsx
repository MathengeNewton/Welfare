import { Member } from "../types/member";
import { Location } from "../types/location";

interface MemberTableProps {
  members: Member[];
  locations: Location[];
}

export default function MemberTable({ members, locations }: MemberTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-pcea-blue text-pcea-gold">
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Membership #</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Name</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Location</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Phone</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, idx) => {
            const location = locations.find((l) => l.id === member.locationId);
            return (
              <tr key={member.id} className={idx % 2 === 0 ? "bg-pcea-white" : "bg-gray-50"}>
                <td className="px-4 py-2 text-gray-900 font-semibold">{member.membershipNumber}</td>
                <td className="px-4 py-2 text-gray-900 font-semibold">{member.name}</td>
                <td className="px-4 py-2 text-gray-900">{location ? location.name : "-"}</td>
                <td className="px-4 py-2 text-gray-900">{member.kyc.phone}</td>
                <td className="px-4 py-2">
                  <button className="text-pcea-blue hover:text-pcea-gold font-bold underline">View</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
