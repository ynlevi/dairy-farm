"use client";
import { CartContext } from "@/provider/cart-provider";
import { useContext, useEffect, useState } from "react";
function checkout() {
  const [checkoutId, setCheckoutId] = useState(null);
  const { cart, update } = useContext(CartContext);
  useEffect(() => {
    if (cart && cart !== "isEmpty") {
      setCheckoutId(cart.checkoutId);
    }
  });
  return (
    <div className="z-20 absolute w-screen h-screen bg-black inset-0 -top-16 mx-auto p-5 sm:p-20 lg:p-32 2xl:px-52">
      <h1 className="text-4xl">checkout</h1>
      <form></form>
    </div>
  );
}
// onClick={() => getOrder(checkoutId)}

export default checkout;
