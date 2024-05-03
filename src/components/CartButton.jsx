"use client";

import Loading from "@/app/loading";
import { CartContext } from "@/provider/cart-provider";
import { Suspense, useContext } from "react";
import { FaOpencart } from "react-icons/fa";
export default function CartButton() {
  const { open, setOpen, cart, isLoading } = useContext(CartContext);

  return (
    <button
      onClick={() => setOpen((prev) => !prev)}
      className={`p-4 flex items-center flex-col h-fit bg-rose-300`}
    >
      <FaOpencart size={30} />

      <span>{`${
        !cart || isLoading ? ".." : cart === "isEmpty" ? 0.0 : cart.itemQuantity
      }`}</span>
    </button>
  );
}
//
