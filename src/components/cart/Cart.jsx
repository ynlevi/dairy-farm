"use client";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { CartContext } from "@/providers/cart-provider";
import { TfiClose } from "react-icons/tfi";
import { RxDoubleArrowRight } from "react-icons/rx";
import { CartItem } from "./CartItem";
import { useCycle, motion } from "framer-motion";
import CartButton from "./CartButton";

export default function Cart() {
  const { open, setOpen, cart, isLoading } = useContext(CartContext);

  useEffect(() => {
    console.log("cart", cart);
  }, [cart]);

  const varients = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <>
      <CartButton />
      <motion.div
        variants={varients}
        animate={open ? "open" : "closed"}
        initial="closed"
        className={`hidden h-screen w-screen fixed inset-0 bg-blue-500 bg-opacity-40 cursor-pointer z-20 
          ${open && "lg:block"}`}
        onClick={() => setOpen((prev) => !prev)}
      ></motion.div>
      <motion.div
        initial="closed"
        className={`bg-purple-200 text-black h-screen fixed w-full inset-0 lg:left-2/3 lg:w-1/3 inset-y-0 z-30 `}
        variants={varients}
        animate={open ? "open" : "closed"}
      >
        <ul className="p-5 h-full text-lg font-thin flex flex-col justify-between  ">
          <li className="flex justify-between">
            <h2 className=" text-3xl">Your Cart</h2>
            <button
              className="z-10 relative"
              onClick={() => setOpen((prev) => !prev)}
            >
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
                after taxs:<span className="text-gray-500">- -</span>
              </div>
            </div>
            <Link onClick={() => setOpen(false)} href={"/checkout"}>
              <form
                className={`capitalize bg-blue-500 h-fit mt-auto px-3 text-white py-2 flex items-center gap-2 ${
                  (isLoading || cart === "isEmpty") &&
                  "bg-gray-300 pointer-events-none "
                }`}
              >
                <span>check out</span>
                <RxDoubleArrowRight size={22} />
              </form>
            </Link>
          </li>
        </ul>
      </motion.div>
    </>
  );
}
