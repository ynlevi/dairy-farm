///make a fucntiont that get cart with a specific id and than return the cheack fthe account credit
import { swell } from "@/lib/swell/node";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { id } = await req.json();
  console.log("id", id);
  const data = await swell.get("/accounts/667c70636da501001227ba86", {
    // id: "667d6df23d23160013f5037a",
    expand: "account", //667c70636da501001227ba86
  });
  return NextResponse.json({ data: data });
}
