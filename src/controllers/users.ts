import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import { Error } from "mongoose";
import { normalizeUser } from "../utils";
import { AuthRequestInterface } from "../types/authRequest.interface";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dbUser = await UserModel.findOne({ email: req.body.email });

    if (dbUser) {
      return res.status(400).json({
        messages: "User already exists",
      });
    }

    const user = new UserModel(req.body);
    await user.save();

    res.status(201).json(normalizeUser(user));
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const messages = Object.values(err.errors).map((err) => err.message);
      return res.status(400).json({
        messages,
      });
    }
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        messages: ["User not found"],
      });
      throw new Error("User not found");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }
    res.status(200).json(normalizeUser(user));
  } catch (err) {
    console.log(err);
    if (err instanceof Error.ValidationError) {
      const messages = Object.values(err.errors).map((err) => err.message);
      return res.status(400).json({
        messages,
      });
    }
  }
};

export const getCurrentUser = async (
  req: AuthRequestInterface,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      messages: "No user found in request",
    });
  }
  res.status(200).json(normalizeUser(req.user));
};
