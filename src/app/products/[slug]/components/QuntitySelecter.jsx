"use client";
import React from "react";
import { useContext } from "react";
import { CartContext } from "@/provider/cart-provider";
import { useRef, useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import AddToCart from "./AddToCart";
const QuntitySelecter = ({ id, price, options }) => {
  const { cart } = useContext(CartContext);
  const selectRef = useRef(null);
  const [newQ, setNewQ] = useState(false);
  const defaultOptions = options.map((option) => {
    return {
      id: option.id,
      name: option.name,
      value: option.values[0].name,
      price: option.values[0].price,
      isChoosen: false,
    };
  });
  const [choosenOptoins, setChoosenOptoins] = useState(defaultOptions);
  const [totalPrice, setTotalPrice] = useState(price);
  useEffect(() => {
    if (cart !== "isEmpty" && cart) {
      cart.items.some((item) => item.productId === id);
    }
  }, [cart, id]);

  const handleDivClick = () => {
    selectRef?.current.showPicker();
  };
  const handleOption = ({ isChoosen, price, name }) => {
    setTotalPrice(isChoosen ? totalPrice - price : totalPrice + price);
    setChoosenOptoins(
      choosenOptoins.map((option) => {
        if (option.name === name) {
          return { ...option, isChoosen: !isChoosen };
        }
        return option;
      })
    );
  };
  return (
    <>
      {choosenOptoins.map(({ id, isChoosen, name, price }) => (
        <button
          onClick={() => handleOption({ isChoosen, price, name })}
          key={id}
          className={`capitalize flex p-2 gap-2 w-fit text-xs mt-2 bg-gray-900 border ${
            isChoosen
              ? "border-yellow-300 text-yellow-300"
              : "border-black text-white"
          }`}
        >
          <span>{"+ " + name}</span>
          <span>{"$" + price.toFixed(2)}</span>
        </button>
      ))}
      <div className="flex mt-3 gap-3 w-full">
        <div
          className="flex gap-3 items-center border py-2 lg:py-3 w-1/2 cursor-pointer justify-center "
          onClick={handleDivClick}
        >
          <span>QTY: </span>
          <select
            ref={selectRef}
            className={`border-0  outline-none w-fit cursor-pointer bg-black `}
            value={newQ ? newQ : 1}
            onChange={(e) => setNewQ(Number(e.target.value))}
          >
            {[...Array(50).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <SlArrowDown size={18} />
        </div>
      </div>

      <p className="text-xs pt-1">
        Total: ${newQ ? (newQ * totalPrice).toFixed(2) : totalPrice.toFixed(2)}
      </p>
      {
        <AddToCart
          quantity={newQ ? newQ : 1}
          id={id}
          options={choosenOptoins}
          setOptions={setChoosenOptoins}
          defaultOptions={defaultOptions}
        />
      }
    </>
  );
};

export default QuntitySelecter;
