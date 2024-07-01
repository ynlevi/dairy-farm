"use client";
import { useContext } from "react";
import { CartContext } from "@/providers/cart-provider";

export default function AddToCart({
  className,
  id,
  quantity,
  options,
  setOptions,
  defaultOptions,
}) {
  const { addItem, isLoading } = useContext(CartContext);

  const handleClick = () => {
    let opts = options.filter((option) => option.isChoosen);
    opts = opts.map((option) => ({
      name: option.name,
      value: option.value,
    }));
    addItem(id, quantity, opts);
    setOptions(defaultOptions);
  };
  return (
    <button
      className={`w-full justify-center flex text-purple-700 font-extrabold p-3 mt-3  mx-auto pointer-events-auto ${
        isLoading
          ? "bg-purple-500 pointer-events-none"
          : quantity
          ? "bg-yellow-300"
          : "bg-yellow-200 "
      } ${className}`}
      onClick={handleClick}
    >
      <span>Add To Cart</span>
    </button>
  );
}
