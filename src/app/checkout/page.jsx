"use client";
// import { swell } from "@/lib/swell/client";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/provider/cart-provider";

function page() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [orderMethod, setOrderMethod] = useState(null);
  const { cart } = useContext(CartContext);
  const router = useRouter();

  const onSumbit = async (evt) => {
    evt.preventDefault();
    //make sure order methood is choosen

    if (!orderMethod) {
      setErrorMessage("Please choose order Method");
    }

    const data = {
      name: evt.target.name.value,
      email: evt.target.email.value,
      id: cart.id,
      orderMethod: orderMethod,
    };

    try {
      const response = await fetch("/api/update-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // [].message
      if (!response.ok) {
        const { errors } = await response.json();
        setErrorMessage(errors);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response);
      router.push(response.url);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOrderMethod = (method) => {
    setErrorMessage(null);
    setOrderMethod(method);
    console.log(method);
  };

  return (
    <form className="" onSubmit={onSumbit}>
      <h2>check out</h2>
      {errorMessage && (
        <div className="text-sm text-red-500">
          {errorMessage.map((error) => error)}
        </div>
      )}
      <div className="flex">
        <div className="flex flex-col">
          <label className="text-xs" htmlFor="name">
            Name
          </label>
          <input className="text-black" type="text" id="name" required />
          <label className="text-xs " htmlFor="email" required>
            Email
          </label>
          <input className="text-black" type="email" id="email" />
        </div>
        ///////////// ADD PROMO CODE!!!!!!!
        {/* <div className="">
        <label htmlFor="promocode">Promo Code</label>
        <input type="text" id="promocode" />
      </div> */}
      </div>
      <div className="">
        <button type="button" onClick={() => handleOrderMethod("pickup")}>
          Pick Up
        </button>
        <button type="button" onClick={() => handleOrderMethod("delivery")}>
          Delivery
        </button>
      </div>
      <button
        className={`p-3 ${
          orderMethod && !errorMessage
            ? " bg-blue-700"
            : "cursor-not-allowed bg-blue-300"
        }`}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default page;
