import { dbConfig } from "@/utils/dbconfig";
import todoModel from "@/utils/model/todoModel";
import userModel from "@/utils/model/userModel";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();

    const { todoID } = params;

    const todo = await todoModel.findById(todoID);

    if (todo) {
      const updatedTodo = await todoModel.findByIdAndUpdate(
        todoID,
        { status: true },
        { new: true }
      );

      return NextResponse.json({
        message: "update todo status",
        status: 201,
        data: updatedTodo,
      });
    } else {
      return NextResponse.json({
        message: "Error reading user",
        status: 404,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user",
      status: 404,
    });
  }
};

export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();

    const { todoID, userID } = params;

    const user = await todoModel.findById(userID);
    await todoModel.findByIdAndDelete(todoID);

    user.todo.pull(new Types.ObjectId(todoID));
    user.save();

    return NextResponse.json({
      message: "delete todo status",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user",
      status: 404,
    });
  }
};
