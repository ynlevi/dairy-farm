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
      setLoading(false);
      return;
    }

    setCart(cart);
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

  const addGiftCard = async (giftcard) => {
    setLoading(true);
    try {
      const cart = await swell.cart.applyGiftcard(giftcard);
      setCart(cart);
    } catch (err) {
      setLoading(false);
      return err.message;
    }
    setLoading(false);
    return null;
  };
  const removeGiftCard = async (giftcard) => {
    setLoading(true);
    updateCart(swell.cart.removeGiftcard(giftcard));
    getCart();
    setLoading(false);
  };

  const addPromocode = async (promocode) => {
    setLoading(true);
    try {
      const cart = await swell.cart.applyCoupon(promocode);
      setCart(cart);
    } catch (err) {
      setLoading(false);
      return err.message;
    }
    setLoading(false);
    return null;
  };

  const removePromocode = async () => {
    updateCart(swell.cart.removeCoupon());
  };

  //account
  const login = async (email, pass) => {
    setLoading(true);
    const account = await swell.account.login(email, pass);
    console.log("account ask to log in:", account);
    getCart();
    setLoading(false);
    return account;
  };
  const logout = async () => {
    await swell.account.logout();
    getCart();
  };

  const recover = async (email) => {
    const account = await swell.account.recover({
      email,
      resetUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/account/reset?key={reset_key}`,
    });
    getCart();

    return account;
  };
  const signup = async (email, firstName, emailOptin = false, password) => {
    const account = await swell.account.create({
      email,
      firstName,
      emailOptin,
      password,
    });

    if (account.errors) {
      return null;
    }
    getCart();
    return account;
  };

  return {
    cart,
    addItem,
    updateItem,
    removeItem,
    isLoading,
    getCart,
    addGiftCard,
    removeGiftCard,
    addPromocode,
    removePromocode,
    login,
    logout,
    recover,
    signup,
  };
};

// export const useAccount = () => {
//   const [account, setAccount] = useState(null);
//   const [isLoading, setLoading] = useState(true);
//   useEffect(() => {
//     getAccount();
//   }, []);
//   const login = async () => {
//     const account = await swell.account.login;
//     setAccount(account);
//     setLoading(false);
//     return account;
//   };
//   return {
//     account,
//     isLoading,
//     getAccount,
//   };
// };
