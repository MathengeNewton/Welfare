"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Layout from "./Layout";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  return isLogin ? <>{children}</> : <Layout>{children}</Layout>;
}