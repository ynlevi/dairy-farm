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
    login,
    logout,
    recover,
    signup,
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
        login,
        logout,
        recover,
        signup,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
