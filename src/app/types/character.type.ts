export type Character = {
  _id: string;
  fullName: string;
  position?: number;
  avatar: string;
  difficulty?: number;
  overview?: string;
  strengths?: string[];
  weaknesses?: string[];
};
