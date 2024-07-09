import { NextRequest, NextResponse } from "next/server";

import { dbConfig } from "@/utils/dbconfig";
import userModel from "@/utils/model/userModel";
import todoModel from "@/utils/model/todoModel";
import { Types } from "mongoose";

export const PATCH = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { avatar, avatarID } = await req.json();
    const { userID } = params;

    const user = await userModel.findById(userID);

    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
        { avatar, avatarID },
        { new: true }
      );

      return NextResponse.json({
        message: "creating user",
        status: 201,
        data: updatedUser,
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

export const POST = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { title, desc } = await req.json();
    const { userID } = params;

    const user = await userModel.findById(userID);

    if (user) {
      const createTodo = await todoModel.create({ title, desc });

      user.todos.push(new Types.ObjectId(createTodo._id));
      user?.save();

      return NextResponse.json({
        message: "creating todo",
        status: 201,
        data: createTodo,
      });
    } else {
      return NextResponse.json({
        message: "Error reading user",
        status: 404,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "Error creating todo",
      status: 404,
      err: error.message,
    });
  }
};

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { userID } = params;

    const user = await userModel.findById(userID).populate({
      path: "todos",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return NextResponse.json({
      message: "creating todo",
      status: 201,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user",
      status: 404,
    });
  }
};
