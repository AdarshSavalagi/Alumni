export interface ReferralRequest {
    id: number;
    name: string;
    position: string;
    company: string;
    studentBatch: string;
    optionalMessage?: string;
    status: 'Pending' | 'Read' | 'Approved';
  }

  export  interface Referral {
    id: number;
    name: string;
    company: string;
    position: string;
    description: string;
    date: string;
  }
  