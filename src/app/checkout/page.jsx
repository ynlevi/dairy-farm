"use client";
// import { swell } from "@/lib/swell/client";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/providers/cart-provider";
import Image from "next/image";
import Payment from "./components/Payment";
import CheckOutCart from "./components/OrderSummary";
import NameField from "../../components/form/FNameField";
import EmailField from "../../components/form/EmailField";
import SubmitButton from "../../components/form/SubmitButton";
import { PaymentProvider } from "@/providers/payment-provider";
import OrderSummary from "./components/OrderSummary";

function page() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPickUp, setIsPickUp] = useState(true);
  const [checkOutIsCompleted, setCheckOutIsCompleted] = useState(false);
  const { cart, loading } = useContext(CartContext);

  const onSumbit = async (evt) => {
    evt.preventDefault();
    let data = {};
    if (cart.accountLoggedIn) {
      data = {
        id: cart.id,
        isPickUp: isPickUp,
        isLoogedIn: true,
      };
    } else {
      data = {
        name: evt.target.fname.value,
        email: evt.target.email.value,
        id: cart.id,
        isPickUp: isPickUp,
        isLoogedIn: false,
      };
    }

    try {
      const response = await fetch("/api/update-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setCheckOutIsCompleted(true);
      } else {
        const { message } = await response.json();
        setErrorMessage(message);
        throw new Error(`HTTP error! Status: ${response}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex gap-4 flex-col lg:flex-row ">
      {checkOutIsCompleted ? (
        <PaymentProvider>
          <Payment />
        </PaymentProvider>
      ) : (
        <form className="lg:w-1/2" onSubmit={onSumbit}>
          <h2 className="text-3xl capitalize mb-2 font-thin">check out</h2>
          {errorMessage && (
            <div className="text-sm text-red-500">{errorMessage}</div>
          )}

          {!cart?.accountLoggedIn && (
            <div className="flex flex-col mt-5 gap-2 lg:gap-4">
              <NameField required={true} />
              <EmailField />
            </div>
          )}

          <div className="w-full flex mt-2 ">
            <button
              className={`p-2 w-full  ${
                isPickUp ? "bg-yellow-300 text-black" : "bg-gray-700"
              }`}
              type="button"
              onClick={() => setIsPickUp(true)}
            >
              Pick Up
            </button>
            <button
              className={`p-2 w-full ${
                isPickUp ? "bg-gray-700" : "bg-yellow-300 text-black"
              }`}
              type="button"
              onClick={() => setIsPickUp(false)}
            >
              Delivery
            </button>
          </div>

          <SubmitButton
            className="w-full "
            loading={loading}
            error={errorMessage}
          >
            continue
          </SubmitButton>
        </form>
      )}
      <OrderSummary />
    </div>
  );
}

export default page;
