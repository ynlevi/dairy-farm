"use client";
import { useContext, useRef, useState, useEffect } from "react";
import { CartContext } from "@/provider/cart-provider";
import Image from "next/image";
export const CartItem = ({ item }) => {
  const { removeItem } = useContext(CartContext);
  const {
    price,
    quantity,
    id,
    product: { name, images, slug },
  } = item;
  return (
    <li className="flex justify-between border-r border-l-4 pl-2 border-blue-300 bg-gradient-to-l  from-blue-200 to-transparent  ">
      <div className="flex flex-col gap-2">
        <p className="">{name}</p>
        <QuntitySelecter itemId={id} quantity={quantity} />
        <button
          className="text-gray-400 text-sm text-start"
          onClick={() => removeItem(id)}
        >
          remove
        </button>
      </div>
      <div className="relative h-28 w-1/2">
        <Image
          alt={slug}
          fill={true}
          src={images[0].file.url}
          className="object-cover"
        />
        <p className="relative top-[calc(100%-2.5rem)] text-base right-4 text-white backdrop-blur-lg px-2 py-1 inline-block rounded-full ">
          ${price.toFixed(2)}
        </p>
      </div>
    </li>
  );
};

const QuntitySelecter = ({ quantity, itemId }) => {
  const { updateItem } = useContext(CartContext);
  const inputRef = useRef(null);
  const [selectedMore, setSelctedMore] = useState(false); // i want it false as a defult, and only when user choose "9+" in the options, I want it to change to true.
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState(quantity);
  const amounts =
    quantity > 9
      ? [1, 2, 3, 4, 5, 6, 7, 8, 9, quantity, "9+"]
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, "9+"];

  // focus on the input when user select "9+".
  useEffect(() => {
    inputRef.current.focus();
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
    } else {
      inputRef.current.focus();
      setInputFocus(true);
    }
  };

  return (
    <div className="flex gap-1">
      <span>Q: </span>
      <select
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
        <input
          id="quantity"
          name="quantity"
          ref={inputRef}
          className={`w-14 px-1 focus:outline-none bg-transparent focus:bg-white  ${
            selectedMore ? "inline-block " : "hidden"
          } `}
          onFocus={() => setInputFocus(true)}
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
