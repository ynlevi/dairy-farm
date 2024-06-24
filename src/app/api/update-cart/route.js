import { swell } from "@/lib/swell/node";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
export async function POST(req) {
  try {
    const body = await req.json();
    const { id, name, email, isPickUp } = body;

    if (!name || !email || !id || !isPickUp) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const cart = await swell.put("/carts/{id}", {
      id: id,
      shipping: {
        pickup: isPickUp,
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
    if (cart.errors) {
      const messages = [];
      for (const key in cart.errors) {
        if (cart.errors[key].message) {
          messages.push(cart.errors[key].message);
        }
      }
      if (messages.length === 1 && messages[0] === "Already exists") {
        // return NextResponse.redirect(
        //   process.env.NEXT_PUBLIC_BASE_URL + "/payment"
        // );
        return NextResponse.json(
          { message: "Cart updated successfully" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { cart: cart, errors: messages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Cart updated successfully" },
      { status: 200 }
    );
    // return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/payment");
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
