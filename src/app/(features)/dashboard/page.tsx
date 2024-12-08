"use client"
import React from "react";
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={()=>signOut()}>Sign Out</button>
    </div>
  )
}
