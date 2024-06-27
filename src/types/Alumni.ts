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
    batch: string;
    department: string;
    photo: string;
}


export interface AlumniDashboard {
  name: string;
  batch: number;
  email: string;
  phone: string;
  address: string;
  company: string;
  position: string;
  photo: string;
  linkedin: string;
  rating: number;
  review: string;
  department: string;
  isVerified: boolean;
  isTestimonial:boolean|null;
  password: string;
}