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
  // More mock members for richer data
  {
    id: '3',
    membershipNumber: 'M003',
    name: 'Alice Wanjiku',
    kyc: {
      dob: '1992-03-22',
      idNumber: '23456789',
      phone: '0711122233',
      email: 'alice@example.com',
    },
    locationId: 'loc1',
    createdAt: '2025-03-12',
  },
  {
    id: '4',
    membershipNumber: 'M004',
    name: 'Peter Kamau',
    kyc: {
      dob: '1988-07-19',
      idNumber: '34567890',
      phone: '0722333444',
      email: 'peter@example.com',
    },
    locationId: 'loc2',
    createdAt: '2025-04-18',
  },
  {
    id: '5',
    membershipNumber: 'M005',
    name: 'Grace Njeri',
    kyc: {
      dob: '1995-11-30',
      idNumber: '45678901',
      phone: '0733445566',
      email: 'grace@example.com',
    },
    locationId: 'loc1',
    createdAt: '2025-05-25',
  },
  {
    id: '6',
    membershipNumber: 'M006',
    name: 'Samuel Otieno',
    kyc: {
      dob: '1991-09-14',
      idNumber: '56789012',
      phone: '0744556677',
      email: 'samuel@example.com',
    },
    locationId: 'loc2',
    createdAt: '2025-06-10',
  },
  {
    id: '7',
    membershipNumber: 'M007',
    name: 'Mary Atieno',
    kyc: {
      dob: '1993-12-05',
      idNumber: '67890123',
      phone: '0755667788',
      email: 'mary@example.com',
    },
    locationId: 'loc1',
    createdAt: '2025-07-02',
  },
  {
    id: '8',
    membershipNumber: 'M008',
    name: 'David Mwangi',
    kyc: {
      dob: '1987-10-11',
      idNumber: '78901234',
      phone: '0766778899',
      email: 'david@example.com',
    },
    locationId: 'loc2',
    createdAt: '2025-08-15',
  },
];
