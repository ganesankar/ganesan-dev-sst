"use client";
import React, { createContext, useContext } from "react";
import {
  useSession as nextAuthUseSession,
  signIn,
  signOut,
} from "next-auth/react";
import { Session } from "next-auth";

import { Button, Spinner } from "flowbite-react";
const SessionContext = createContext<Session>({} as Session);
export const useSession = () => useContext(SessionContext);

export default function LoginWrapperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = nextAuthUseSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen">
        <div className="m-auto text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          <Spinner aria-label="Loading" size="xl"  />
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <SessionContext.Provider value={session}>
        {children}
      </SessionContext.Provider>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto ">
        <Button color="gray" pill onClick={() => signIn("cognito")}>
          Sign in
        </Button>
      </div>
    </div>
  );
}
