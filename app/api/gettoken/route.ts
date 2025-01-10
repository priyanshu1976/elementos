import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  console.log("get token endpoint");
  const data = await req.json();
  console.log(data);
  const token = jwt.sign({ email: data.email }, "merasecret");

  return NextResponse.json(
    JSON.stringify({
      token: token,
    })
  );
}
