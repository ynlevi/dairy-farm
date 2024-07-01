"use client";
import { useContext, useState } from "react";
import { CartContext } from "@/providers/cart-provider";

import SubmitButton from "../../../components/form/SubmitButton";
import EmailField from "../../../components/form/EmailField";

export default function page() {
  const [loading, setLoading] = useState(false);
  const { recover } = useContext(CartContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleRecover = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const email = evt.target.email.value;
    const res = await recover(email);
    if (res.success === false) {
      setErrorMessage(res.message);
      evt.target.email.value = "";
      setLoading(false);
      return;
    }
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className=" max-w-sm mx-auto">
      <h2 className="font-thin text-2xl">Recover Password</h2>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      {success ? (
        <p className="text-green-500 text-sm">
          Please check your email, if you don't see it, please check your spam
          box.
        </p>
      ) : (
        <form className="flex flex-col mt-3 gap-1 " onSubmit={handleRecover}>
          <EmailField />
          <SubmitButton loading={loading} error={errorMessage}>
            Recover Password
          </SubmitButton>
        </form>
      )}
    </div>
  );
}

{
  /* <div className="flex gap-2">
          <input type="checkbox" id="emailOptin" />
          <label className="text-sm text-gray-200 " htmlFor="emailOptin">
            I would like to subscribe to the newsletter and get exclusive offers
            and promotions.
          </label>
        </div> */
}
