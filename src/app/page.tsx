

import { Location } from "../types/location";
import { mockMembers } from "../mock/members";
import { mockFamilies } from "../mock/families";
import { mockLocations } from "../mock/locations";
import { mockContributions } from "../mock/contributions";

// Helper: Aggregate contributions by month (show all months, even with 0)
function getMonthlyContributions(): [string, number][] {
  // Get all months in the data, sorted
  const monthsSet = new Set(mockContributions.map((c: { month: string }) => c.month));
  const months = Array.from(monthsSet).sort();
  // Sum contributions per month
  const map = new Map<string, number>();
  mockContributions.forEach((c: { month: string; amount: number }) => {
    map.set(c.month, (map.get(c.month) || 0) + c.amount);
  });
  // Return all months, filling 0 for missing
  return months.map((month) => [month, map.get(month) || 0]);
}

// Helper: Aggregate members by location (show all districts, even with 0)
function getMemberDistribution(): [string, number][] {
  const allLocIds = mockLocations.map((l) => l.id);
  const map = new Map<string, number>();
  mockMembers.forEach((m: { locationId: string }) => {
    map.set(m.locationId, (map.get(m.locationId) || 0) + 1);
  });
  return allLocIds.map((id) => [id, map.get(id) || 0]);
}

// --- Chart Components ---
function formatMonth(month: string) {
  // month is 'YYYY-MM'
  const [year, m] = month.split('-');
  const date = new Date(Number(year), Number(m) - 1);
  return date.toLocaleString('default', { month: 'short', year: '2-digit' });
}

function BarChart({ data }: { data: [string, number][] }) {
  if (data.length === 0) return <div className="text-gray-400">No data</div>;
  const max = Math.max(...data.map(([, v]) => v));
  return (
    <svg viewBox={`0 0 ${data.length * 60} 180`} width="100%" height="180">
      {/* Y-axis grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={0}
          x2={data.length * 60}
          y1={160 - t * 120}
          y2={160 - t * 120}
          stroke="#e5e7eb"
          strokeDasharray="4 2"
        />
      ))}
      {/* Bars and labels */}
      {data.map(([month, value]: [string, number], i: number) => (
        <g key={month}>
          <rect
            x={i * 60 + 30}
            y={160 - (value / max) * 120}
            width={30}
            height={(value / max) * 120}
            fill="#1e3a8a"
            rx={6}
          />
          <text x={i * 60 + 45} y={175} textAnchor="middle" fontSize="12" fill="#888">
            {formatMonth(month)}
          </text>
          <text x={i * 60 + 45} y={160 - (value / max) * 120 - 8} textAnchor="middle" fontSize="12" fill="#1e3a8a" fontWeight="bold">
            {value}
          </text>
        </g>
      ))}
      {/* Y-axis labels */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <text
          key={t}
          x={0}
          y={160 - t * 120 + 4}
          fontSize="10"
          fill="#bbb"
          textAnchor="start"
        >
          {Math.round(max * t)}
        </text>
      ))}
    </svg>
  );
}

function PieChart({ data, locations }: { data: [string, number][], locations: Location[] }) {
  if (data.length === 0) return <div className="text-gray-400">No data</div>;
  const total = data.reduce((sum: number, [, v]: [string, number]) => sum + v, 0);
  let acc = 0;
  // Vibrant color palette
  const colors = ["#1e3a8a", "#f59e42", "#e11d48", "#10b981", "#facc15", "#6366f1", "#f472b6", "#111827"];
  return (
    <div className="flex items-center justify-center gap-10">
      <svg viewBox="0 0 140 140" width="140" height="140">
        {data.map(([locId, value]: [string, number], i: number) => {
          const start = acc;
          const angle = total === 0 ? 0 : (value / total) * 2 * Math.PI;
          acc += angle;
          const x1 = 70 + 60 * Math.sin(start);
          const y1 = 70 - 60 * Math.cos(start);
          const x2 = 70 + 60 * Math.sin(acc);
          const y2 = 70 - 60 * Math.cos(acc);
          const large = angle > Math.PI ? 1 : 0;
          return (
            <g key={locId}>
              <path d={`M70,70 L${x1},${y1} A60,60 0 ${large} 1 ${x2},${y2} Z`} fill={colors[i % colors.length]} />
            </g>
          );
        })}
      </svg>
      {/* Enhanced Legend */}
      <div className="flex flex-col gap-2 min-w-[120px]">
        <div className="font-semibold text-pcea-blue mb-1">Districts</div>
        {data.map(([locId, value]: [string, number], i: number) => {
          const loc = locations.find((l) => l.id === locId);
          return (
            <div key={locId + "-legend"} className="flex items-center gap-2 text-sm">
              <span className="inline-block w-3 h-3 rounded-full border border-gray-200" style={{ background: colors[i % colors.length] }} />
              <span className="font-medium text-pcea-black">{loc ? loc.name : locId}</span>
              <span className="text-gray-500">({value})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const totalMembers = mockMembers.length;
  const totalFamilies = mockFamilies.length;
  const totalDistricts = mockLocations.length;
  const totalContributions = mockContributions.reduce((sum: number, c: { amount: number }) => sum + c.amount, 0);

  // Mock trend data for demo
  const trends = [
    { up: true, value: 2.5 },
    { up: false, value: 1.2 },
    { up: true, value: 0.8 },
    { up: true, value: 5.1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-pcea-blue tracking-tight">Dashboard</h2>
            <p className="text-gray-500 text-sm">Welfare Management Overview</p>
          </div>
        </div>
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <MetricCard
            label="Total Members"
            value={totalMembers}
            color="blue"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            trend={trends[0]}
          />
          <MetricCard
            label="Total Families"
            value={totalFamilies}
            color="gold"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>}
            trend={trends[1]}
          />
          <MetricCard
            label="Total Districts"
            value={totalDistricts}
            color="red"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>}
            trend={trends[2]}
          />
          <MetricCard
            label="Total Contributions"
            value={`KES ${totalContributions.toLocaleString()}`}
            color="black"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2" /></svg>}
            trend={trends[3]}
          />
        </div>
        {/* Charts and Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart: Monthly Contributions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[260px]">
            <h3 className="text-base font-semibold text-pcea-blue mb-4">Monthly Contributions</h3>
            <BarChart data={getMonthlyContributions()} />
          </div>
          {/* Pie Chart: Member Distribution by Location */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[260px]">
            <h3 className="text-base font-semibold text-pcea-blue mb-4">Members by District</h3>
            <PieChart data={getMemberDistribution()} locations={mockLocations as Location[]} />
          </div>
        </div>
        {/* ...next: add quick stats, recent contributions, top districts, etc... */}
      </div>
    </div>
  );
// (removed extra closing brace)

// --- Metric Card Component ---
function MetricCard({ label, value, color, icon, trend }: { label: string; value: string | number; color: string; icon: React.ReactNode; trend: { up: boolean; value: number } }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-pcea-blue text-white',
    gold: 'bg-pcea-gold text-white',
    red: 'bg-pcea-red text-white',
    black: 'bg-pcea-black text-white',
  };
  const ringMap: Record<string, string> = {
    blue: 'ring-pcea-blue/20',
    gold: 'ring-pcea-gold/20',
    red: 'ring-pcea-red/20',
    black: 'ring-pcea-black/20',
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 ring-1" style={{ boxShadow: '0 2px 12px 0 rgba(16,30,54,0.06)' }}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${colorMap[color]} ${ringMap[color]}`}>
          {icon}
        </div>
        <div className="flex-1 text-right">
          <div className="text-2xl font-bold text-pcea-black">{value}</div>
          <div className="text-xs text-gray-500 font-medium">{label}</div>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <span className={trend.up ? 'text-green-600' : 'text-red-600'}>
          {trend.up ? '▲' : '▼'} {trend.value}%
        </span>
        <span className="text-xs text-gray-400 ml-1">from last month</span>
      </div>
    </div>
  );
}
}
