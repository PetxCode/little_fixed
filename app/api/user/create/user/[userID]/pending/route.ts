import { dbConfig } from "@/utils/dbconfig";
import userModel from "@/utils/model/userModel";
import { NextRequest, NextResponse } from "next/server";

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

    const pending = user.todos.filter((el: any) => {
      return el.status === false;
    });

    return NextResponse.json({
      message: "reading pending todos",
      status: 200,
      data: pending,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user",
      status: 404,
    });
  }
};
