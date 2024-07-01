"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/providers/cart-provider";
import Options from "../../../components/Options";

export default function OrderSummary() {
  const { cart, isLoading, removeGiftCard, removePromocode } =
    useContext(CartContext);

  return (
    <div className="lg:w-1/2 bg-gray-900 p-4 capitalize">
      {isLoading ? (
        <div className="">Cart loading...</div>
      ) : (
        <div className="">
          <h3 className="text-3xl capitalize font-thin">Order Summary</h3>
          <h4 className="tracking-wide text-lg font-thin mt-4">Items</h4>
          <ul className="flex divide-y flex-col divide-gray-600">
            {cart?.items.map((item) => (
              <li
                className="w-full items-center justify-between grid grid-cols-12"
                key={item.id}
              >
                <div className="col-span-5">{item.product.name}</div>
                <div className="col-span-2">{"$" + item.price.toFixed(2)}</div>
                <div className="col-span-3 mx-auto">
                  {"Q: " + item.quantity}
                </div>
                <Image
                  className="object-cover h-16 w-16 ml-auto col-span-2"
                  src={item.product.images[0].file.url}
                  width={50}
                  height={50}
                  alt="product image"
                />
                <ul className="flex flex-row gap-1 col-span-12 ">
                  {item.options.map((option) => (
                    <li
                      className={`whitespace-nowrap text-sm bg-blue-950 p-1`}
                      key={option.id}
                    >
                      + {option.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          {cart?.giftcards?.length > 0 && (
            <div className="">
              <h4 className="header-sm">Gift Cards</h4>
              <ul className="flex mt-2 flex-col gap-1">
                {cart?.giftcards?.map(({ last4, amount, id }) => (
                  <li
                    key={id}
                    className="w-full bg-gray-800 flex justify-between gap-4 border border-green-500 p-2 text-sm"
                  >
                    <div className="text-gray-300 max-w-1/4 ">
                      {"XXXX "}
                      {last4}
                    </div>
                    <div className="text-green-500">
                      {"$" + amount.toFixed(2)}
                    </div>
                    <div className="text-green-500">Applied</div>
                    <button
                      onClick={() => removeGiftCard(id)}
                      className="bg-slate-700 text-gray-300 text-xs p-1 h-fit my-auto"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cart?.discounts?.length > 0 && (
            <div className="">
              <h4 className="header-sm">Promo Code</h4>
              <ul>
                {cart?.discounts?.map(
                  ({ id, amount, rule: { valuePercent, valueType } }) => (
                    <li
                      key={id}
                      className="w-full bg-gray-800 grid grid-cols-4 gap-4 justify-center border border-green-500 p-2 text-sm"
                    >
                      {valueType === "percent" && (
                        <div className="text-gray-300 ">
                          {`- ${valuePercent}%`}
                        </div>
                      )}
                      <div className="text-green-500">
                        {"-$" + amount.toFixed(2)}
                      </div>
                      <div className="text-green-500">Applied</div>
                      <button
                        onClick={() => removePromocode(id)}
                        className="bg-slate-700 text-gray-300 text-xs p-1"
                      >
                        Remove
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          <p className="mt-4 text-gray-300 text-sm">{`Sub Total: $${cart?.subTotal.toFixed(
            2
          )}`}</p>
          <div className="text-gray-300 text-sm">
            {cart?.taxes?.map(({ name, amount }) => (
              <p key={name}>{name + ": $" + amount.toFixed(2)}</p>
            ))}
          </div>
          {cart?.giftcardTotal > 0 && (
            <p className="text-green-500 text-sm capitalize">
              {"-$" +
                Math.min(cart?.grandTotal, cart?.giftcardTotal).toFixed(2) +
                " from gift cards balance"}
            </p>
          )}
          <p className="mt-2 text-xl">{`Order Total: $${Math.max(
            0,
            cart?.grandTotal - cart?.giftcardTotal
          ).toFixed(2)}`}</p>
        </div>
      )}
    </div>
  );
}
