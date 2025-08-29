
import { notFound } from "next/navigation";
import { mockFamilies } from "../../../mock/families";
import { mockMembers } from "../../../mock/members";
import { Family } from "../../../types/family";
import { Member } from "../../../types/member";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function getFamilyById(id: string): Family | undefined {
  return mockFamilies.find((f) => f.id === id);
}

function getFamilyMembers(family: Family): Member[] {
  return mockMembers.filter((m) => family.memberIds.includes(m.id));
}

export default function Page({ params }: { params: { id: string } }) {
  const family = getFamilyById(params.id);
  if (!family) return notFound();
  const members = getFamilyMembers(family);
  const head = members[0];

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-6 md:p-12">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center border border-gray-200">
          <div className="w-20 h-20 rounded-full bg-pcea-blue flex items-center justify-center text-pcea-gold text-3xl font-bold mb-2">
            {head ? head.name.split(' ').map(n => n[0]).join('') : '??'}
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-pcea-blue mb-1">{head ? head.name : '-'}</div>
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">Family Head</span>
            <div className="text-xs text-gray-500 mb-1">ID: {head ? head.kyc.idNumber : '-'}</div>
            <div className="text-xs text-gray-500 mb-1">Phone: {head ? head.kyc.phone : '-'}</div>
            <div className="text-xs text-gray-500 mb-1">Email: {head ? head.kyc.email : '-'}</div>
          </div>
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li><span className="text-pcea-blue font-semibold">Family Details</span></li>
            <li><span className="text-pcea-blue font-semibold">Family Tree</span></li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1">
        <h2 className="text-3xl font-extrabold mb-8 text-pcea-blue tracking-tight">{family.name} Account</h2>
        <div className="grid gap-8">
          {/* Account Info Card */}
          <section className="bg-gray-50 rounded-xl shadow p-8">
            <h3 className="text-xl font-bold mb-6 text-pcea-blue">Family Account Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-2 text-gray-500 text-xs">Family Name</div>
                <div className="font-semibold text-lg text-pcea-black mb-4">{family.name}</div>
                <div className="mb-2 text-gray-500 text-xs">Family Head</div>
                <div className="font-semibold text-lg text-pcea-black mb-4">{head ? head.name : '-'}</div>
                <div className="mb-2 text-gray-500 text-xs">Status</div>
                <div className="font-semibold text-lg mb-4">
                  {members.length > 0 ? <span className="text-green-700">Active</span> : <span className="text-gray-500">Inactive</span>}
                </div>
              </div>
              <div>
                <div className="mb-2 text-gray-500 text-xs">Member Count</div>
                <div className="font-semibold text-lg text-pcea-black mb-4">{members.length}</div>
                <div className="mb-2 text-gray-500 text-xs">Family ID</div>
                <div className="font-semibold text-lg text-pcea-black mb-4">{family.id}</div>
              </div>
            </div>
          </section>
          {/* Head Details Card */}
          {head && (
            <section className="bg-gray-50 rounded-xl shadow p-8">
              <h3 className="text-xl font-bold mb-6 text-pcea-blue flex items-center gap-2"><UserCircleIcon className="w-6 h-6 text-pcea-gold" /> Head Details</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="mb-2 text-gray-500 text-xs">Name</div>
                  <div className="font-semibold text-lg text-pcea-black mb-4">{head.name}</div>
                  <div className="mb-2 text-gray-500 text-xs">Membership #</div>
                  <div className="font-semibold text-lg text-pcea-black mb-4">{head.membershipNumber}</div>
                </div>
                <div>
                  <div className="mb-2 text-gray-500 text-xs">Phone</div>
                  <div className="font-semibold text-lg text-pcea-black mb-4">{head.kyc.phone}</div>
                  <div className="mb-2 text-gray-500 text-xs">ID Number</div>
                  <div className="font-semibold text-lg text-pcea-black mb-4">{head.kyc.idNumber}</div>
                </div>
                <div>
                  <div className="mb-2 text-gray-500 text-xs">Email</div>
                  <div className="font-semibold text-lg text-pcea-black mb-4">{head.kyc.email || '-'}</div>
                  <div className="mb-2 text-gray-500 text-xs">Date of Birth</div>
                  <div className="font-semibold text-lg text-pcea-black mb-4">{head.kyc.dob}</div>
                </div>
              </div>
            </section>
          )}
          {/* Family Tree Card */}
          <section className="bg-gray-50 rounded-xl shadow p-8">
            <h3 className="text-xl font-bold mb-6 text-pcea-blue">Family Tree</h3>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-pcea-blue text-pcea-gold rounded-full px-8 py-3 font-bold text-xl shadow-lg border-4 border-pcea-gold mb-2">{head ? head.name : '-'}</div>
                <span className="text-xs text-pcea-black font-semibold">Family Head</span>
              </div>
              <div className="flex flex-wrap gap-6 justify-center">
                {members.slice(1).map((m) => (
                  <div key={m.id} className="flex flex-col items-center">
                    <div className="bg-pcea-gold text-pcea-blue rounded-full px-6 py-2 font-semibold shadow border-4 border-pcea-blue">{m.name}</div>
                    <span className="text-xs text-pcea-black font-semibold">Member</span>
                  </div>
                ))}
                {members.length === 1 && (
                  <span className="text-gray-400 italic">No other members</span>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
