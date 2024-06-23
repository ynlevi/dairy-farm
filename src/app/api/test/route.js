import { NextResponse } from "next/server";
import { swell } from "@/lib/swell/node";
export async function GET() {
  const cart = await swell.get("/carts");
  console.log(cart, "get cart test");
  return NextResponse.json({ cart: cart });
}
