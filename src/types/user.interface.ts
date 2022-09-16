import { Document } from "mongoose";
import { Role } from "./role.enum";

export interface UserInterface {
  email: string;
  username: string;
  role: Role;
  password: string;
  createdAt: Date;
}

export interface UserDocument extends UserInterface, Document {
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}
