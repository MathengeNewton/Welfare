export interface Member {
  id: string;
  membershipNumber: string;
  name: string;
  kyc: {
    dob: string;
    idNumber: string;
    phone: string;
    email?: string;
  };
  locationId: string;
  familyId?: string;
  isOfficial?: boolean;
  createdAt: string;
}
