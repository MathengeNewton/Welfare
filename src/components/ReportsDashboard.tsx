import { mockRegistrationReports, mockLocationContributionReports } from "../mock/reports";
import { mockLocations } from "../mock/locations";

export default function ReportsDashboard() {
  // Registration by location
  const registrationByLocation = mockRegistrationReports.map((r) => {
    const location = mockLocations.find((l) => l.id === r.locationId);
    return {
      ...r,
      locationName: location ? location.name : r.locationId,
    };
  });

  // Contributions by location
  const contributionsByLocation = mockLocationContributionReports.map((r) => {
    const location = mockLocations.find((l) => l.id === r.locationId);
    return {
      ...r,
      locationName: location ? location.name : r.locationId,
    };
  });

  // Membership growth (mocked as registration count per year)
  const growth = registrationByLocation.reduce((acc, curr) => {
    acc[curr.year] = (acc[curr.year] || 0) + curr.count;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Member Registration by Location (2025)</h3>
          <ul>
            {registrationByLocation.map((r) => (
              <li key={r.locationId} className="mb-1">
                <span className="font-medium">{r.locationName}:</span> {r.count} members
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Location Contributions (2025-08)</h3>
          <ul>
            {contributionsByLocation.map((r) => (
              <li key={r.locationId} className="mb-1">
                <span className="font-medium">{r.locationName}:</span> KES {r.total}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Membership Growth Over Years</h3>
          <ul>
            {Object.entries(growth).map(([year, count]) => (
              <li key={year} className="mb-1">
                <span className="font-medium">{year}:</span> {count} members
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
