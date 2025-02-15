// TODO: Create an interface for the Candidate objects returned by the API
// candidate.interface.tsx

export interface Candidate {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
}
