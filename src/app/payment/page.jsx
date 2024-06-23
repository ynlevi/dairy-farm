"use client";
import { swell } from "@/lib/swell/client";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/provider/cart-provider";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { cart } = useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    async function initializePayment() {
      await swell.payment.createElements({
        card: {
          elementId: "card-element",
          options: {
            hidePostalCode: true,
          },
        },
      });
      setLoading(false);
    }

    initializePayment();
  }, []);

  const tokenize = async (event) => {
    // event.preventDefault();

    await swell.payment.tokenize({
      card: {
        onError: (err) => {
          // inform the customer there was an error
          setErrorMessage(err.message);
        },
        onSuccess: async () => {
          setErrorMessage(null);
          //fire submit Order
          await swell.cart.submitOrder();
          router.push(`/order/${cart.checkoutId}`);
        },
      },
    });
  };

  const submitPayment = async () => {
    setLoading(true);
    tokenize();
    setLoading(false);
  };

  return (
    <div className="bg-white text-black  p-4 ">
      {errorMessage && (
        <div className="error-message text-red-500 text-sm  ">
          {errorMessage}
        </div>
      )}
      <div id="card-element"></div>
      <button onClick={submitPayment}>Pay Now</button>
    </div>
  );
}
