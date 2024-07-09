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

    const completed = user.todos.filter((el: any) => {
      return el.status === true;
    });

    return NextResponse.json({
      message: "reading completed todos",
      status: 200,
      data: completed,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user",
      status: 404,
    });
  }
};
