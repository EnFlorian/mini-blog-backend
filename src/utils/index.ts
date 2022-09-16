import { UserDocument } from "../types/user.interface";
import jwt from "jsonwebtoken";

export const normalizeUser = (user: UserDocument) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
  return {
    email: user.email,
    username: user.username,
    id: user.id,
    token,
  };
};

export const getErrorMessage = (err: any): string => {
  return err instanceof Error ? err.message : String(err);
};
