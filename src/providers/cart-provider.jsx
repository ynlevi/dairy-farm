"use client";

import GiftCard from "@/app/checkout/components/GiftCard";
import { useCart } from "@/lib/swell/hooks";
import React from "react";
import { useState } from "react";

export const CartContext = React.createContext();
export const CartProvider = ({ children }) => {
  const {
    cart,
    addItem,
    updateItem,
    removeItem,
    isLoading,
    addGiftCard,
    removeGiftCard,
    addPromocode,
    removePromocode,
  } = useCart();
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
        addGiftCard,
        removeGiftCard,
        addPromocode,
        removePromocode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
