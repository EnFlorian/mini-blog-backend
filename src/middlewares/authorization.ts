import { NextFunction, Response } from "express";
import { AuthRequestInterface } from "../types/authRequest.interface";
import { Role } from "../types/role.enum";

export const restrictTo = (roles: Role[]) => {
  return (req: AuthRequestInterface, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as Role)) {
      return res.status(403).json({
        messages: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
