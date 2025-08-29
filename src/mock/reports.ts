import { RegistrationReport, LocationContributionReport } from '../types/report';

export const mockRegistrationReports: RegistrationReport[] = [
  { locationId: 'loc1', year: 2025, count: 1 },
  { locationId: 'loc2', year: 2025, count: 1 },
];

export const mockLocationContributionReports: LocationContributionReport[] = [
  { locationId: 'loc1', month: '2025-08', total: 1000 },
  { locationId: 'loc2', month: '2025-08', total: 1000 },
];
