"use client";

import { swell } from "@/lib/swell/client";
import { useSearchParams, useRouter } from "next/navigation";
import PasswordFiled from "../../../components/form/PasswordField";
import { useState } from "react";
import isPasswordStrong from "@/functions/isPasswordStrong";
import SubmitButton from "../../../components/form/SubmitButton";
export default function page() {
  const searchParams = useSearchParams();
  const resetKey = searchParams.get("key");
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!isPasswordStrong(evt.target.password.value)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one number and one letter"
      );
      return;
    }

    if (evt.target.password.value !== evt.target.confirmPassword.value) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!resetKey) {
      setErrorMessage("Invalid link.");
      router.push("/account/recover");
      return;
    }
    setLoading(true);

    const res = await swell.account.resetPassword({
      password: evt.target.password.value,
      resetKey,
    });

    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }

    setErrorMessage(null);
    setLoading(false);
    router.push("/account/login");
  };

  return (
    <div className=" max-w-sm mx-auto">
      <h2 className="font-thin text-2xl">Reset Password</h2>
      <h4 className="text-sm mt-2 text-gray-200">
        Please create a password with at least 8 characters, including one
        number, one lowercase letter, and one uppercase letter.
      </h4>
      <form className="flex flex-col mt-3 gap-2 " onSubmit={handleSubmit}>
        <PasswordFiled id={"password"} name={"Password"} />
        <PasswordFiled id={"confirmPassword"} name={"Confirm Password"} />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <SubmitButton loading={loading} error={errorMessage}>
          Reset Password
        </SubmitButton>
      </form>
    </div>
  );
}
