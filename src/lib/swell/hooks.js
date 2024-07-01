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
  };
};

export const useAccount = () => {
  const [account, setAccount] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getAccount = async () => {
    setLoading(true);
    const account = await swell.account.get();
    if (!account) {
      setLoading(false);
      return;
    }
    setAccount(account);
    setLoading(false);
    return account;
  };

  //get account for the first time or if user refresh the page.
  useEffect(() => {
    getAccount();
  }, []);
  //account

  const login = async (email, pass) => {
    setLoading(true);
    const account = await swell.account.login(email, pass);
    if (account.errors || !account) {
      setLoading(false);
      return null;
    }

    setAccount(account);
    setLoading(false);
    return account;
  };

  const logout = async () => {
    await swell.account.logout();
    setAccount(null);
  };

  const recover = async (email) => {
    setLoading(true);

    const account = await swell.account.recover({
      email,
      resetUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/account/reset?key={reset_key}`,
    });

    if (account.errors) {
      setLoading(false);
      return null;
    }
    setAccount(account);
    setLoading(false);
    return account;
  };
  const signup = async (email, password, firstName, emailOptin = false) => {
    const account = await swell.account.create({
      email,
      firstName,
      emailOptin,
      password,
    });

    if (account.errors) {
      setLoading(false);
      return null;
    }
    setAccount(account);
    setLoading(false);
    return account;
  };
  return {
    isLoading,
    account,
    getAccount,
    login,
    logout,
    recover,
    signup,
  };
};
