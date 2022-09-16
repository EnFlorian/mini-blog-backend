import { Error, model, Schema } from "mongoose";
import { UserDocument } from "../types/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Role } from "../types/role.enum";

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Invalid email"],
      createIndexes: { unique: true },
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [32, "Password must be at most 32 characters"],
      trim: true,
    },
    role: {
      type: String,
      default: Role.USER,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 8);
      this.password = hashedPassword;
    } catch (err) {
      next(err as Error);
    }
  }
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default model<UserDocument>("User", UserSchema);
