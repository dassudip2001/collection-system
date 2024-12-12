"use client"
import React from "react";
import { signOut,useSession } from "next-auth/react"

export default function DashboardPage() {
  const {data:session}=useSession();
  return (
    <div>
      {session?.user?.name}
      <h1>Dashboard</h1>
      <button onClick={()=>signOut()}>Sign Out</button>
    </div>
  )
}
