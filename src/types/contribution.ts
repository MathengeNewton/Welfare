export interface Contribution {
  id: string;
  memberId: string;
  month: string; // e.g. '2025-08'
  amount: number;
  createdAt: string;
}
