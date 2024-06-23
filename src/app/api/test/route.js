import { NextResponse } from "next/server";
import { swell } from "@/lib/swell/node";

export async function GET() {
  // const cart = await swell.get("/carts");
  const rendomApi = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const cart = await rendomApi.json();
  console.log(cart, "get cart test");
  return NextResponse.json({ cart: cart });
}
