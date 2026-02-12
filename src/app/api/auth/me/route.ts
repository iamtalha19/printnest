import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUsers } from "@/app/lib/db";

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token" }, { status: 401 });
    }
    const decoded = jwt.verify(token, SECRET_KEY!) as { id: string }; 
    const users = await getUsers();
    const user = users.find((u) => u.id === decoded.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({ 
      user: userWithoutPassword 
    });

  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}