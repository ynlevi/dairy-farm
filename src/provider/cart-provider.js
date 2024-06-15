"use client";

import { useCart } from "@/lib/swell/hooks";
import React from "react";
import { useState } from "react";

export const CartContext = React.createContext();
export const CartProvider = ({ children }) => {
  const { cart, addItem, updateItem, removeItem, isLoading, getOrder, update } =
    useCart();
  const [open, setOpen] = useState(false);

  return (
    <CartContext.Provider
      value={{
        open,
        setOpen,
        isLoading,
        cart,
        addItem,
        updateItem,
        removeItem,
        getOrder,
        update,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
