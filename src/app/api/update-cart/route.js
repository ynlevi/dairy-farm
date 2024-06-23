import { swell } from "@/lib/swell/node";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
export async function POST(req) {
  try {
    const body = await req.json();
    const { id, name, email, orderMethod } = body;

    if (!name || !email || !id || !orderMethod) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const cart = await swell.put("/carts/{id}", {
      id: id,
      shipping: {
        pickup: orderMethod,
        country: "CA",
        state: "QC",
        city: "Montreal",
      },
      billing: {
        name: name,
      },
      account: {
        email: email,
      },
    });
    console.log("Updated cart:", cart);

    return NextResponse.json({ cart: cart }, { status: 200 });
    // return NextResponse.redirect(process.env.NEXT_PUBLIC_HOME_URL + "/payment");
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
