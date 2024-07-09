"use client";

import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode } from "react";

interface iSession {
  children: ReactNode;
}
const MainSession: FC<iSession> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default MainSession;
