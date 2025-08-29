export interface RegistrationReport {
  locationId: string;
  year: number;
  count: number;
}

export interface LocationContributionReport {
  locationId: string;
  month: string;
  total: number;
}
