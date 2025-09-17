"use client";


import { useState, useEffect } from "react";
import api from "../utils/axios";
import { RegistrationReport, LocationContributionReport } from "../types/report";
import { Location } from "../types/location";

type RegistrationByLocation = RegistrationReport & { locationName: string };
type ContributionByLocation = LocationContributionReport & { locationName: string };

export default function ReportsDashboard() {
  const [registrationByLocation, setRegistrationByLocation] = useState<RegistrationByLocation[]>([]);
  const [contributionsByLocation, setContributionsByLocation] = useState<ContributionByLocation[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [contributionsByLoc, setContributionsByLoc] = useState<Record<string, number[]>>({});
  const [growth, setGrowth] = useState<Record<number, number>>({});
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalLocations, setTotalLocations] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [reportsRes, locationsRes] = await Promise.all([
        api.get("/reports"),
        api.get("/locations"),
      ]);
      const reports: { registrationReports: RegistrationReport[]; locationContributionReports: LocationContributionReport[] } = reportsRes.data;
      const locs: Location[] = locationsRes.data;
      // Registration by location
      const regByLoc: RegistrationByLocation[] = reports.registrationReports.map((r: RegistrationReport) => {
        const location = locs.find((l: Location) => l.id === r.locationId);
        return {
          ...r,
          locationName: location ? location.name : r.locationId,
        };
      });
      // Contributions by location and month
      const contribByLoc: ContributionByLocation[] = reports.locationContributionReports.map((r: LocationContributionReport) => {
        const location = locs.find((l: Location) => l.id === r.locationId);
        return {
          ...r,
          locationName: location ? location.name : r.locationId,
        };
      });
      // Group contributions by month for each location
      const monthsArr: string[] = Array.from(new Set(reports.locationContributionReports.map((r: LocationContributionReport) => r.month))).sort();
      const locNames: string[] = locs.map((l: Location) => l.name);
      const contribsByLoc: Record<string, number[]> = {};
      locNames.forEach((loc: string) => {
        contribsByLoc[loc] = monthsArr.map((month: string) => {
          const found = contribByLoc.find((r: ContributionByLocation) => r.locationName === loc && r.month === month);
          return found ? found.total : 0;
        });
      });
      // Membership growth (mocked as registration count per year)
      const growthObj: Record<number, number> = regByLoc.reduce((acc: Record<number, number>, curr: RegistrationByLocation) => {
        acc[curr.year] = (acc[curr.year] || 0) + curr.count;
        return acc;
      }, {});
      // Stats
      setRegistrationByLocation(regByLoc);
      setContributionsByLocation(contribByLoc);
      setLocations(locNames);
      setMonths(monthsArr);
      setContributionsByLoc(contribsByLoc);
      setGrowth(growthObj);
      setTotalMembers(regByLoc.reduce((sum: number, r: RegistrationByLocation) => sum + r.count, 0));
      setTotalContributions(contribByLoc.reduce((sum: number, r: ContributionByLocation) => sum + r.total, 0));
      setTotalLocations(locs.length);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="bg-pcea-blue rounded-t-lg px-6 py-3 mb-0">
        <h2 className="text-lg md:text-2xl font-bold text-pcea-gold tracking-wide">OVERVIEW</h2>
      </div>
      <div className="bg-white rounded-b-lg shadow-xl p-6 md:p-8 -mt-1 text-pcea-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Revenues Bar Chart Placeholder */}
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
            <span className="font-semibold text-pcea-blue mb-2">Revenues</span>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full h-32 bg-gradient-to-t from-pcea-gold/30 to-pcea-gold/70 rounded flex items-end gap-1 px-2">
                {/* Fake bars */}
                {[2, 3, 6, 8, 7, 6, 5, 6, 7, 8, 7, 9].map((h, i) => (
                  <div key={i} className="bg-pcea-blue rounded-t" style={{ width: '8%', height: `${h * 10 + 20}px` }} />
                ))}
              </div>
            </div>
          </div>
          {/* Contributions by Month per Location Line Chart */}
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
            <span className="font-semibold text-pcea-blue mb-2">Contributions by Month per Location</span>
            <div className="flex-1 flex items-center justify-center">
              <svg width="100%" height="90" viewBox={`0 0 300 90`} className="w-full">
                {/* Y axis */}
                <line x1="30" y1="10" x2="30" y2="80" stroke="#888" strokeWidth="1" />
                {/* X axis */}
                <line x1="30" y1="80" x2="290" y2="80" stroke="#888" strokeWidth="1" />
                {/* Y axis labels */}
                {[0, 500, 1000].map((v) => (
                  <text key={v} x={0} y={80 - (v / 1000) * 60 + 4} fontSize="10" fill="#222">{v}</text>
                ))}
                {/* X axis labels */}
                {months.map((m: string, i: number) => {
                  const x = 30 + (i / (months.length - 1 || 1)) * 260;
                  return <text key={`month-${m}`} x={x} y={90} fontSize="10" fill="#222" textAnchor="middle">{m.slice(5)}</text>;
                })}
                {/* Data lines */}
                {locations.map((loc: string, idx: number) => {
                  const color = idx === 0 ? '#1e3a8a' : '#e11d48';
                  const values = contributionsByLoc[loc];
                  const points = values.map((v: number, i: number) => {
                    const x = 30 + (i / (months.length - 1 || 1)) * 260;
                    const y = 80 - (v / 1000) * 60;
                    return `${x},${y}`;
                  }).join(' ');
                  return (
                    <polyline key={`line-${loc}`} points={points} fill="none" stroke={color} strokeWidth="3" />
                  );
                })}
              </svg>
            </div>
            <div className="flex justify-end gap-4 mt-2 text-xs">
              {locations.map((loc: string, idx: number) => (
                <span key={`legend-${loc}`} className={idx === 0 ? "text-pcea-blue font-bold" : "text-pcea-red font-bold"}>{loc}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Stat Cards */}
          <div className="bg-white border rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-xs text-pcea-black mb-1 font-semibold">MEMBERS</span>
            <span className="text-2xl font-bold text-pcea-blue">{totalMembers}</span>
          </div>
          <div className="bg-white border rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-xs text-pcea-black mb-1 font-semibold">LOCATIONS</span>
            <span className="text-2xl font-bold text-pcea-blue">{totalLocations}</span>
          </div>
          <div className="bg-white border rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-xs text-pcea-black mb-1 font-semibold">CONTRIBUTIONS</span>
            <span className="text-2xl font-bold text-pcea-blue">KES {totalContributions}</span>
          </div>
          <div className="bg-white border rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-xs text-pcea-black mb-1 font-semibold">GROWTH (2025)</span>
            <span className="text-2xl font-bold text-pcea-blue">{growth[2025] || 0}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Registration by Location */}
          <div className="bg-gray-50 rounded-lg p-4">
            <span className="font-semibold text-pcea-blue mb-2 block">Member Registration by Location (2025)</span>
            <ul>
              {registrationByLocation.map((r) => (
                <li key={r.locationId + '-' + r.year} className="mb-1 flex justify-between text-pcea-black">
                  <span className="font-medium">{r.locationName}</span>
                  <span>{r.count} members</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Contributions by Location */}
          <div className="bg-gray-50 rounded-lg p-4">
            <span className="font-semibold text-pcea-blue mb-2 block">Location Contributions (2025-08)</span>
            <ul>
              {contributionsByLocation.map((r) => (
                <li key={r.locationId + '-' + r.month} className="mb-1 flex justify-between text-pcea-black">
                  <span className="font-medium">{r.locationName}</span>
                  <span>KES {r.total}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
