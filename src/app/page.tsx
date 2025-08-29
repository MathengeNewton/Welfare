export default function Home() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to the Welfare Management Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Members</h3>
          <p>Register and manage all welfare members, view KYC, and assign locations.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Locations</h3>
          <p>Manage locations, area codes, and assign officials from the members list.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Families</h3>
          <p>Register families and add members to each family for easy tracking.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Contributions</h3>
          <p>Track monthly contributions for each member and see payment status.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Reports</h3>
          <p>View registration and contribution reports, and membership trends.</p>
        </div>
      </div>
    </div>
  );
}
