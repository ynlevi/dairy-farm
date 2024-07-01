import { swell } from "@/lib/swell/node";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body, "body");
    let data = {};
    if (body.isLoogedIn) {
      data = {
        id: body.id,
        shipping: {
          pickup: body.isPickUp,
        },
      };
      console.log(data, "body");
    } else {
      //make sure all the nessery fields are there in case of a guest user
      if (!body.name || !body.email || !body.id) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 }
        );
      }
      data = {
        id: body.id,
        shipping: {
          pickup: body.isPickUp,
          country: "CA",
          state: "QC",
          city: "Montreal",
        },
        billing: {
          name: body.name,
        },
        account: {
          email: body.email,
        },
      };
    }
    const { id } = body;

    const cart = await swell.put("/carts/{id}", { data });
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
