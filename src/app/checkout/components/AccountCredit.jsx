import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/providers/cart-provider";
import { PaymentContext } from "@/providers/payment-provider";
export default function AccountCredit() {
  const { cart } = useContext(CartContext);
  const { balance, paymentMethod } = useContext(PaymentContext);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("submitted");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="label-headr" htmlFor="accountCredit">
        Account Credit
      </label>
      <div className="flex flex-col gap-2 lg:flex-row justify-between mt-2">
        <div className=" p-4 border-4 bg-yellow-100 border-yellow-300 rounded-3xl lg:w-6/12">
          <p className="capitalize text-lg">credit balance: </p>
          <p
            className={`text-2xl ${
              balance > 0 ? "text-green-500" : "text-gray-500"
            }`}
          >{`$${balance.toFixed(2)}`}</p>
          <p className="text-xs text-gray-500">
            Your balance will be deducted from your account
          </p>
        </div>
        <button className=" capitalize bg-yellow-300 h-fit my-auto py-2 px-4">
          buy more credit
        </button>
      </div>
    </form>
  );
}
