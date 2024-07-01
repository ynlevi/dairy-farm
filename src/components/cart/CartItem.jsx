// 1. fix problem of bg price on safari (both iphone and desktop)
// 2. activate update btn when pressing.
"use client";
import { motion } from "framer-motion";
import { useContext, useRef, useState, useEffect } from "react";
import { CartContext } from "@/providers/cart-provider";
import Image from "next/image";
import Options from "../Options";
export const CartItem = ({ item }) => {
  const { removeItem } = useContext(CartContext);
  const {
    price,
    quantity,
    id,
    options,
    product: { name, images, slug },
  } = item;
  return (
    <li className="text-base flex justify-between border-r border-l-4 pl-2 border-white bg-gradient-to-l  from-white to-transparent  ">
      <div className="flex flex-col gap-2 py-2">
        <p className="">{name}</p>
        <QuntitySelecter itemId={id} quantity={quantity} />
        <Options options={options} className={"bg-white capitalize"} />
        <button
          className="text-gray-400 text-sm text-start"
          onClick={() => removeItem(id)}
        >
          remove
        </button>
      </div>
      <div className="relative w-32 aspect-square">
        <Image
          alt={slug}
          fill={true}
          src={images[0].file.url}
          className="object-cover"
          sizes="12rem"
        />
        <p className="relative font-normal top-[calc(100%-2.5rem)] text-base right-8 text-white backdrop-blur-sm px-2 py-1 inline-block rounded-full bg-blue-900 bg-opacity-20 ">
          ${price.toFixed(2)}
        </p>
      </div>
    </li>
  );
};

const QuntitySelecter = ({ quantity, itemId }) => {
  const { updateItem } = useContext(CartContext);
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  const [selectedMore, setSelctedMore] = useState(false); // i want it false as a defult, and only when user choose "9+" in the options, I want it to change to true.
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState(quantity);
  const [blur, setBlur] = useState(false);
  const amounts =
    quantity > 9
      ? [1, 2, 3, 4, 5, 6, 7, 8, quantity, "9+"]
      : [1, 2, 3, 4, 5, 6, 7, 8, "9+"];

  // focus on the input when user select "9+".
  useEffect(() => {
    inputFocus && inputRef.current.focus();
  }, [inputFocus]);

  const handleSelectChange = (evt) => {
    const { value } = evt.target;
    value <= 9 && updateItem(itemId, value); // update item In case user select new item from the exsiting amounts array.
    if (value === "9+") {
      setSelctedMore(true);
      setInputFocus(true);
    }
  };

  const handleUpdateForm = (evt) => {
    evt.preventDefault();
    if (inputFocus) {
      updateItem(itemId, evt.target[0].value);
      setInputFocus(false);
      setSelctedMore(false);
    } else {
      setSelctedMore(true);
      setInputFocus(true);
    }
  };
  const handleBlur = () => {
    inputRef.current.focus();
    setSelctedMore(true);
  };
  return (
    <div className="flex gap-1">
      <span>QTY: </span>
      <select
        ref={selectRef}
        className={`selecter-prevent-defult border-0 outline-none bg-transparent text-black w-12 cursor-pointer ${
          selectedMore ? "hidden" : "inline-block"
        }`}
        value={quantity}
        onChange={handleSelectChange}
      >
        {amounts.map((amount) => (
          <option value={amount} key={amount}>
            {amount}
          </option>
        ))}
      </select>
      {/* typing castum amount */}
      <form className="flex" onSubmit={handleUpdateForm}>
        <label htmlFor="quantity" />
        <motion.input
          id="quantity"
          name="quantity"
          ref={inputRef}
          className={`w-14 px-1 focus:outline-none bg-transparent focus:bg-white  ${
            selectedMore ? "inline-block " : "hidden"
          } `}
          // onFocus={() => setInputFocus(true)}
          onBlur={handleBlur}
          onChange={(e) => setInputValue(e.target.value)}
          inputMode="numeric"
          type="number"
          required
          max="99"
          min="0"
          value={inputValue}
        />
        <input
          className={`cursor-pointer text-xs h-fit p-1 rounded-xl my-auto hover:border-black hover:text-black duration-100 ${
            inputFocus
              ? "bg-sky-300 text-white"
              : "text-gray-400 border border-gray-300"
          }`}
          type="submit"
          value={"Update"}
        />
      </form>
    </div>
  );
};
