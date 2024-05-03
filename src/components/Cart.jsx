"use client";
import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/provider/cart-provider";
import { TfiClose } from "react-icons/tfi";
import { RxDoubleArrowRight } from "react-icons/rx";
import { CartItem } from "./CartItem";

export default function Cart() {
  const { open, setOpen, cart, isLoading } = useContext(CartContext);

  return (
    <>
      <div
        className={`h-screen w-screen absolute inset-0 bg-blue-500 bg-opacity-40 z-10 cursor-pointer ${
          open ? "visible" : "invisible"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      ></div>
      <div
        className={`bg-stone-200 text-black absolute w-full  lg:left-2/3 lg:w-1/3 h-full inset-y-0 z-20 ${
          open ? "visible" : "invisible"
        }`}
      >
        <ul className="p-5 h-full text-lg font-thin flex flex-col justify-between  ">
          <li className="flex justify-between">
            <h2 className=" text-3xl">Your Cart</h2>
            <button onClick={() => setOpen(false)}>
              <TfiClose size={30} />
            </button>
          </li>

          {!cart || isLoading ? (
            "loading cart..."
          ) : (
            <li>
              {cart === "isEmpty" ? (
                <h3 className="uppercase absolute top-28">
                  your cart is still empty.
                </h3>
              ) : cart.subTotal === 0 ? (
                <h3 className="uppercase absolute top-28">
                  Your cart is now empty.
                </h3>
              ) : (
                <ul className="flex flex-col gap-3 overflow-scroll h-[calc(100vh-12rem)] ">
                  {cart.items.map((item, i) => (
                    <CartItem key={i} item={item} />
                  ))}
                </ul>
              )}
            </li>
          )}
          <li className=" z-10 flex justify-between ">
            <div className="uppercase">
              <div>
                total: C$
                {!cart ? (
                  <span className="capitalize text-gray-400 text-sm">
                    {" loading..."}
                  </span>
                ) : cart === "isEmpty" ? (
                  0
                ) : (
                  cart.subTotal.toFixed(2)
                )}
              </div>
              <div>
                after taxs:<span className="text-gray-500"> _ _</span>
              </div>
              <div>
                shipping:<span className=" text-gray-500"> _ _</span>
              </div>
            </div>
            <Link
              href={"/#"}
              className={`capitalize bg-blue-500 h-fit mt-auto px-3 text-white py-2 flex items-center gap-2 ${
                (isLoading || cart === "isEmpty") &&
                "bg-gray-300 pointer-events-none "
              }`}
            >
              <span>check out</span>
              <RxDoubleArrowRight size={22} />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
