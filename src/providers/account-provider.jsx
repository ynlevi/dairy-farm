"use client";

import { useAccount } from "@/lib/swell/hooks";

import { createContext } from "react";

export const AccountContext = createContext();
export const AccountProvider = ({ children }) => {
  const { isLoading, account, getAccount, login, logout, recover, signup } =
    useAccount();

  return (
    <AccountContext.Provider
      value={{
        isLoading,
        account,
        getAccount,
        login,
        logout,
        recover,
        signup,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
