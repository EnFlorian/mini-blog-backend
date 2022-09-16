import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";
import { AuthRequestInterface } from "../types/authRequest.interface";

export default async (
  req: AuthRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        messages: "No authorization header",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401);
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      messages: "Invalid authorization header",
    });
  }
};
