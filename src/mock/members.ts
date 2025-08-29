import { Member } from '../types/member';

export const mockMembers: Member[] = [
  {
    id: '1',
    membershipNumber: 'M001',
    name: 'John Doe',
    kyc: {
      dob: '1990-01-01',
      idNumber: '12345678',
      phone: '0712345678',
      email: 'john@example.com',
    },
    locationId: 'loc1',
    createdAt: '2025-01-10',
  },
  {
    id: '2',
    membershipNumber: 'M002',
    name: 'Jane Smith',
    kyc: {
      dob: '1985-05-12',
      idNumber: '87654321',
      phone: '0798765432',
      email: 'jane@example.com',
    },
    locationId: 'loc2',
    createdAt: '2025-02-15',
  },
];
