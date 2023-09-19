import mongoose from "mongoose";

  const UserSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

export const UserModel = mongoose.model("User", UserSchema);
