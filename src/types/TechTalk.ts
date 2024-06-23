
export interface TechTalk {
    id: number;
    name: string;
    topic: string;
    date: string;
  }

  export interface TechTalkRequest {
    id: number;
    name: string;
    topic: string;
    date: string;
    studentBatch: string;
    optionalMessage?: string;
    status: 'Pending' | 'Read' | 'Approved';
  }