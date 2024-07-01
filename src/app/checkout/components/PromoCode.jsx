"use client";

import { swell } from "@/lib/swell/client";
import { useContext, useRef, useState } from "react";
import { CartContext } from "@/providers/cart-provider";
import { PaymentContext } from "@/providers/payment-provider";
export default function GiftCard() {
  const { setPaymentMethod } = useContext(PaymentContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const inputRef = useRef(null);
  const { addPromocode, cart } = useContext(CartContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { value } = inputRef.current;

    const response = await addPromocode(value);

    if (response) {
      setErrorMessage(response);
    }

    //suposte to get response in case of error
    inputRef.current.value = "";
  };

  return (
    <form className=" w-full" onSubmit={handleSubmit}>
      <label className="label-headr" htmlFor="giftcard">
        Promo Code
      </label>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <div className="flex gap-1 w-full ">
        <input
          ref={inputRef}
          className="bg-slate-100 p-2 text-xs grow"
          type="text"
          id="giftcard"
          placeholder="PROMOCODE"
        />
        <button type="submit" className="p-2 text-sm bg-blue-500 text-white">
          {cart?.giftcards?.length > 0 ? "Add" : "Apply"}
        </button>
      </div>
    </form>
  );
}
