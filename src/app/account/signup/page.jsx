"use client";
import { useContext, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import PasswordField from "../../../components/form/PasswordField";
import EmailField from "../../../components/form/EmailField";
import SubmitButton from "../../../components/form/SubmitButton";
import ForgotButton from "../../../components/form/ForgotButton";
import isPasswordStrong from "@/functions/isPasswordStrong";
import NameField from "../../../components/form/FNameField";
import { AccountContext } from "@/providers/account-provider";

export default function page() {
  const { signup, isLoading } = useContext(AccountContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const router = useRouter();

  const handleSignup = async (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const firstName = evt.target.fname.value;
    const password = evt.target.password.value;
    const confirmPassword = evt.target.confirmPassword.value;
    const emailOptin = evt.target.emailOptin.checked;

    if (!isPasswordStrong(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one number and one letter"
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const res = await signup(email, password, firstName, emailOptin);
    console.log(res, "res");
    if (!res) {
      setErrorMessage(
        "Unable to create account. It appears you may already have an account. Please try logging in instead."
      );
      return;
    }

    router.push("/");
    return;
  };

  return (
    <div className=" max-w-sm mx-auto">
      <h2 className="font-thin text-3xl">Sign Up</h2>

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <form className="flex flex-col mt-3 gap-1 " onSubmit={handleSignup}>
        <NameField />
        <EmailField />
        <PasswordField id={"password"} name={"Password"} />
        <h4 className="text-xs mt-2 text-gray-200 ">
          Please create a password with at least 8 characters, including one
          number, one lowercase letter, and one uppercase letter.
        </h4>
        <PasswordField id={"confirmPassword"} name={"Confirm Password"} />
        <div className="flex gap-2 items-start">
          <input type="checkbox" id="emailOptin" className="relative top-1" />
          <label className="text-sm text-gray-200 " htmlFor="emailOptin">
            I would like to subscribe to the newsletter and get exclusive offers
            and promotions.
          </label>
        </div>
        <SubmitButton loading={isLoading} error={errorMessage}>
          Sign Up
        </SubmitButton>
        <ForgotButton />
      </form>
    </div>
  );
}
