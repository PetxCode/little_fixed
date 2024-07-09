import { dbConfig } from "@/utils/dbconfig";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import userModel from "@/utils/model/userModel";

export const POST = async (req: NextRequest) => {
  try {
    await dbConfig();
    const { email, password } = await req.json();

    const user = await userModel.findOne({
      email,
    });

    if (user) {
      const check = await bcrypt.compare(password, user?.password);
      if (check) {
        return NextResponse.json({
          message: `welcome back ${user.name} `,
          status: 201,
          data: user,
        });
      } else {
        return NextResponse.json({
          message: "Error with user's email",
          status: 404,
        });
      }
    } else {
      return NextResponse.json({
        message: "Error with user's email",
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
