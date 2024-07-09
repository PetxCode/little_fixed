import { dbConfig } from "@/utils/dbconfig";
import todoModel from "@/utils/model/todoModel";
import userModel from "@/utils/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();

    const { todoID } = params;
    const { desc } = await req.json();
    const todo = await todoModel.findById(todoID);

    if (todo) {
      const updatedTodo = await todoModel.findByIdAndUpdate(
        todoID,
        { desc },
        { new: true }
      );

      return NextResponse.json({
        message: "update todo desc",
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
