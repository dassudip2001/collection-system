import Navbar from "@/components/Navbar";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div >
    {/* <Navbar /> */}
    <Navbar/>
    {children}
    </div>;
}
