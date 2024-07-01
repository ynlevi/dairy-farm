"use client";

import Loading from "@/app/loading";
import { CartContext } from "@/providers/cart-provider";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { FaOpencart } from "react-icons/fa";
export default function CartButton() {
  const { setOpen, cart, isLoading } = useContext(CartContext);
  const fullPath = usePathname();
  const primaryPath = `/${fullPath.split("/")[1]}`;
  //display cart button only in the Appropriate pages
  const appropriatePath = !["/checkout", "/payment", "/order"].includes(
    primaryPath
  );
  return (
    appropriatePath && (
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`p-3 mb-1 flex items-center flex-col h-fit bg-purple-400 rounded-b-2xl`}
      >
        <FaOpencart size={24} />

        <span>{`${
          !cart || isLoading
            ? ".."
            : cart === "isEmpty"
            ? 0.0
            : cart.itemQuantity
        }`}</span>
      </button>
    )
  );
}
