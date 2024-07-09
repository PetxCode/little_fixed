import { model, models, Schema, Types } from "mongoose";
import { iTodoData } from "../interface";

const todoData = new Schema<iTodoData>(
  {
    title: {
      type: String,
    },

    desc: {
      type: String,
    },

    status: {
      type: Boolean,
      default: false,
    },

    user: {
      type: Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const todoModel = models.Todos || model<iTodoData>("Todos", todoData);

export default todoModel;
