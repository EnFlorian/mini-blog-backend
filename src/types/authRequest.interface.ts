import { Request } from "express";
import { UserDocument } from "./user.interface";

export interface AuthRequestInterface extends Request {
  user?: UserDocument;
}
