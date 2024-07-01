"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "@/providers/cart-provider";
export const PaymentContext = createContext();
export function PaymentProvider({ children }) {
  const [paymentMethod, setPaymentMethod] = useState({
    withCreditCard: true,
    buttonText: "Pay Now",
  });
  const { cart } = useContext(CartContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const GetAccountCredit = async () => {
      const res = await fetch(`/api/account?accountId=${cart.accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { balance } = await res.json();
      setBalance(balance);
    };

    if (cart && cart.accountLoggedIn) GetAccountCredit();
  }, [cart]);
  return (
    <PaymentContext.Provider
      value={{ paymentMethod, setPaymentMethod, balance }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
