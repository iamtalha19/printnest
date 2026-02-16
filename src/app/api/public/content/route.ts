import { NextResponse } from "next/server";
import db from "@/app/data/db.json";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");

    if (section && section in db) {
      return NextResponse.json(db[section as keyof typeof db]);
    }

    return NextResponse.json(db);
  } catch (error) {
    console.error("Content API error:", error);
    return NextResponse.json(
      { message: "Internal Error" },
      { status: 500 }
    );
  }
}
