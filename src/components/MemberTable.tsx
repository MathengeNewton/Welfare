import { Member } from "../types/member";
import { Location } from "../types/location";

interface MemberTableProps {
  members: Member[];
  locations: Location[];
}

export default function MemberTable({ members, locations }: MemberTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Membership #</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const location = locations.find((l) => l.id === member.locationId);
            return (
              <tr key={member.id} className="border-t">
                <td className="px-4 py-2">{member.membershipNumber}</td>
                <td className="px-4 py-2">{member.name}</td>
                <td className="px-4 py-2">{location ? location.name : "-"}</td>
                <td className="px-4 py-2">{member.kyc.phone}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
