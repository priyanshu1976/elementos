import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const token = jwt.sign({ email: data.email }, "merasecret");
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
