"use client";
import { useContext, useEffect } from "react";
import { CartContext } from "@/providers/cart-provider";

export default function Home() {
  const { cart } = useContext(CartContext);
  // useEffect(() => {
  //   async function postAccountCredit() {
  //     if (cart) {
  //       // const res = await fetch("/api/account-credit", {
  //       //   method: "POST",
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //   },
  //       //   body: JSON.stringify({ accountId: cart.accountId }),
  //       // });
  //       // const res = await fetch("/api/get-cart", {
  //       //   method: "POST",
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //   },
  //       //   body: JSON.stringify({ id: cart.id }),
  //       // });
  //     }
  //   }
  //   postAccountCredit();
  // }, [cart]);
  // const data = await rendomApi.json();
  // console.log(rendomApi, "rendomApi");
  return (
    <div className="">
      <h1>wellcom to our dairy store!</h1>
    </div>
  );
}
