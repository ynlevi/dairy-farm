import { useContext } from "react";
import { CartContext } from "@/providers/cart-provider";
import { PaymentContext } from "@/providers/payment-provider";
export default function CreditCard() {
  const { paymentMethod } = useContext(PaymentContext);
  const { cart } = useContext(CartContext);
  return (
    <>
      <label
        className={`text-xs font-bold mt-1 ${
          !paymentMethod.withCreditCard && "text-gray-400"
        } `}
      >
        Card Number
      </label>
      {!cart ? (
        <div className="border p-2 bg-slate-100 text-xs text-gray-400">
          Loading...
        </div>
      ) : (
        <div
          className={`p-3 bg-slate-100 ${
            !paymentMethod.withCreditCard &&
            "before:bg-slate-100 before:bg-opacity-80 before:absolute relative before:h-full before:w-full before:z-10 before:inset-0 "
          }`}
        >
          <div id="card-element" className=""></div>
        </div>
      )}
    </>
  );
}
