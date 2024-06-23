export interface AlumniRegistrationRequest {
    id: number;
    batch: string;
    usn: string;
    name: string;
    linkedId: string;
    testimonials: string;
    ratings: number;
    currentCompany?: string;
    status: 'Pending' | 'Read' | 'Approved';
  }

  export interface Alumni {
    name: string;
    batch: number;
    department: string;
    photo: string;
}
