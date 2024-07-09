import { model, models, Schema, Types } from "mongoose";
import { iUserData } from "../interface";

const userData = new Schema<iUserData>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },

    todos: [
      {
        type: Types.ObjectId,
        ref: "Todos",
      },
    ],
  },
  { timestamps: true }
);

const userModel = models.Users || model<iUserData>("Users", userData);

export default userModel;
