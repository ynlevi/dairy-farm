"use client";
import { useContext } from "react";
import { VscAccount } from "react-icons/vsc";
import { GoChevronDown } from "react-icons/go";
import Link from "next/link";
import { AccountContext } from "@/providers/account-provider";
export default function AccountDisplay() {
  const { account, isLoading } = useContext(AccountContext);
  console.log("account", account);
  return (
    <>
      {isLoading ? (
        <div>...</div>
      ) : (
        <div className="capitalize h-fit my-auto">
          {account ? <ProfileButton account={account} /> : <SignupOrLogin />}
        </div>
      )}
    </>
  );
}

const ProfileButton = ({ account }) => {
  return (
    <div className="rounded-full lg:rounded-none aspect-square lg:aspect-auto bg-gray-800 px-3 py-2 relative flex justify-center h-full gap-1 items-center ">
      <VscAccount />
      <div className="hidden lg:inline-block text-sm ml-1">{account.name}</div>
      <GoChevronDown size={20} className="hidden lg:inline hover:rotate-180" />
    </div>
  );
};
const SignupOrLogin = () => {
  return (
    <div className="tracking-wide flex flex-row gap-1 lg:gap-3 text-xs lg:text-sm font-bold items-center ">
      <Link href={"/account/login"}>
        <p>Log In</p>
      </Link>
      <Link href={"/account/signup"}>
        <p className="border p-1 lg:p-3 border-purple-300">Sign Up</p>
      </Link>
    </div>
  );
};
