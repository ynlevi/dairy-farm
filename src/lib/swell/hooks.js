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
    if (!cart || cart.itemQuantity === 0) {
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

  const addItem = async (id, quantity = 1, options) => {
    const MAX_QUANTITY = 99;
    /// fire === should add new items
    let fire = false;

    if (cart === "isEmpty") {
      fire = true;
    } else {
      const item = cart.items.find((item) => item.productId === id);
      if (!item) {
        fire = true;
      } else if (item.quantity + quantity > MAX_QUANTITY) {
        fire = false;
        alert(
          "Sorry, You can not add more than 99 items, please give us a call"
        );
      } else fire = true;
    }
    if (fire) {
      console.log("add new item", id, quantity);
      updateCart(
        swell.cart.addItem({
          productId: id,
          quantity: quantity ? quantity : 1, // add only one item if not specified otherwise
          options: options,
        })
      );
    }
    fire = false;
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

  const updateAccountInfo = (account) => {
    // updateCart(swell.cart.update(account));
    // updateCart(swell.cart.getOrder());
  };

  //post checkout

  // const postOrder = async (accountId, items) => {
  //   setLoading(true);
  //   const order = await swell.post("/orders", {
  //     accountId: accountId,
  //     items: items,
  //     // billing: {
  //     //   ...
  //     // },
  //     // shipping: {
  //     //   ...
  //     // },
  //     // coupon_code: "FREESHIPPING",
  //   });
  //   console.log("order", order);
  //   setLoading(false);
  // };

  return {
    cart,
    addItem,
    updateItem,
    removeItem,
    isLoading,
    getCart,
    updateAccountInfo,
    // update,
    // getOrder,
  };
};
