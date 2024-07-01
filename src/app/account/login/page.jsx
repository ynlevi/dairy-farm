"use client";
import { useContext, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import PasswordField from "../../../components/form/PasswordField";
import EmailField from "../../../components/form/EmailField";
import SubmitButton from "../../../components/form/SubmitButton";
import ForgotButton from "../../../components/form/ForgotButton";
import { AccountContext } from "@/providers/account-provider";
export default function page() {
  const { login, logout, isLoading } = useContext(AccountContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const handleLogin = async (evt) => {
    evt.preventDefault();

    const email = evt.target.email.value;
    const password = evt.target.password.value;

    const res = await login(email, password);

    if (!res) {
      evt.target.email.value = "";
      evt.target.password.value = "";
      setErrorMessage("Wrong email or password");

      return;
    }
    setErrorMessage(null);
    router.push("/");
  };
  const handleLogout = async () => {
    await logout();
  };

  const handleRecover = async () => {
    await recover(email);
  };

  return (
    <div className=" max-w-sm mx-auto">
      <h2 className="font-thin text-2xl">Log In</h2>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <form className="flex flex-col mt-3 gap-1 " onSubmit={handleLogin}>
        <EmailField />
        <PasswordField id={"password"} name={"Password"} />
        <SubmitButton isLoading={isLoading} error={errorMessage}>
          Log In
        </SubmitButton>
        <ForgotButton />
      </form>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
