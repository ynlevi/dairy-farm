"use client";
import { useState, useEffect } from "react";
import { swell } from "./client";
export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [isLoading, setLoading] = useState(true);

  //get cart for the first time or if user refresh the page.
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    const cart = await swell.cart.get();
    if (!cart) {
      setCart("isEmpty");
    } else {
      setCart(cart);
    }
    setLoading(false);
    return cart;
  };
  const updateCart = async (apiRequest) => {
    setLoading(true);
    const cart = await apiRequest;
    setCart(cart);
    setLoading(false);
  };

  const addItem = (id, quantity) => {
    updateCart(
      swell.cart.addItem({
        productId: id,
        quantity: quantity ? quantity : 1, // add only one item if not specified otherwise
      })
    );
  };

  const updateItem = async (id, quantity) => {
    updateCart(
      swell.cart.updateItem(id, {
        quantity: quantity,
      })
    );
  };

  const removeItem = async (id) => {
    updateCart(swell.cart.removeItem(id));
  };

  return {
    cart,
    addItem,
    updateItem,
    removeItem,
    isLoading,
    getCart,
  };
};
