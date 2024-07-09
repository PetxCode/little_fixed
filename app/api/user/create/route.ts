import { dbConfig } from "@/utils/dbconfig";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import userModel from "@/utils/model/userModel";

export const POST = async (req: NextRequest) => {
  try {
    await dbConfig();
    const { name, email, password } = await req.json();

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      name,
      email,
      password: hashed,
    });
    return NextResponse.json({
      message: "creating user",
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
