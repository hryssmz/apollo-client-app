// models/user.ts
export type DefaultPrivacyLevel = "public" | "private" | "contacts";

export interface User {
  id: string;
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  balance: number;
  avatar: string;
  defaultPrivacyLevel: DefaultPrivacyLevel;
  createdAt: Date;
  modifiedAt: Date;
}
