"use client";
import action from "./action";

import { useContext } from "react";
import { CartContext } from "@/providers/cart-provider";
export default function page() {
  const { login } = useContext(CartContext);
  const handleClick = async () => {
    await action();
  };
  return (
    <div>
      <button onClick={handleClick}>Create</button>
    </div>
  );
}
