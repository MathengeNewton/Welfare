import { Location } from "../types/location";
import { Member } from "../types/member";

interface LocationTableProps {
  locations: Location[];
  members: Member[];
}

export default function LocationTable({ locations, members }: LocationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Area Code</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Officials</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id} className="border-t">
              <td className="px-4 py-2">{loc.areaCode}</td>
              <td className="px-4 py-2">{loc.name}</td>
              <td className="px-4 py-2">
                {loc.officialIds.map((oid) => {
                  const official = members.find((m) => m.id === oid);
                  return official ? (
                    <span key={oid} className="inline-block mr-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {official.name}
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
