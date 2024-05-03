"use client";
import { useContext } from "react";
import { CartContext } from "@/provider/cart-provider";

export default function AddToCart({ item }) {
  const { addItem, isLoading } = useContext(CartContext);

  return (
    <button
      className={`text-purple-700 p-3 ${
        isLoading
          ? "bg-yellow-100 pointer-events-none"
          : "bg-pink-200 pointer-events-auto"
      }`}
      onClick={() => addItem(item.id)}
    >
      Add To Cart!
    </button>
  );
}
