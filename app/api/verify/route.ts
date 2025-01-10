import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("this end point is hit");
  const data = await req.json();
  console.log(data);

  return NextResponse.json({
    message: "wtf",
  });
}
