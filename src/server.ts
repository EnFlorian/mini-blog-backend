import express, { Request, Response } from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import * as usersController from "./controllers/users";

dotenv.config();

import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { Role } from "./types/role.enum";

// Server setup
const app = express();
const httpServer = createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// mongoose setup
mongoose.set("toJSON", {
  virtuals: true,
  transform: (_, converted) => {
    delete converted._id;
  },
});

app.post("/api/users", usersController.registerUser);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
    httpServer.listen(PORT, () => {
      console.log("Listening on port:", PORT);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

console.log(Role.USER === "USER");
