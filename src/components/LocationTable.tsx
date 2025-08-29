import { Location } from "../types/location";
import { Member } from "../types/member";

interface LocationTableProps {
  locations: Location[];
  members: Member[];
}

export default function LocationTable({ locations, members }: LocationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-pcea-blue text-pcea-gold">
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Area Code</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Name</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Officials</th>
            <th className="px-4 py-2 text-left font-bold uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc, idx) => (
            <tr key={loc.id} className={idx % 2 === 0 ? "bg-pcea-white" : "bg-gray-50"}>
              <td className="px-4 py-2 text-gray-900 font-semibold">{loc.areaCode}</td>
              <td className="px-4 py-2 text-gray-900 font-semibold">{loc.name}</td>
              <td className="px-4 py-2">
                {loc.officialIds.map((oid) => {
                  const official = members.find((m) => m.id === oid);
                  return official ? (
                    <span key={oid} className="inline-block mr-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      {official.name}
                    </span>
                  ) : null;
                })}
              </td>
              <td className="px-4 py-2">
                <button className="text-pcea-blue hover:text-pcea-gold font-bold underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
