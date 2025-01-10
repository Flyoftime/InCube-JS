import { NextResponse } from "next/server";
import {
  getAllDetailUsers,
  createDetailUser,
} from "@/lib/prisma-service/userService";

export async function GET() {
  try {
    const users = await getAllDetailUsers();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch users", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id_user, name, age, gender, contact, job } = body;

    if (!name || !age || !gender || !contact || !job) {
      return NextResponse.json(
        { success: false, message: "field are required" },
        { status: 400 }
      );
    }

    const newUser = await createDetailUser(body);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create user", error },
      { status: 500 }
    );
  }
}
