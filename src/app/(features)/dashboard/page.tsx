import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function DashboardPage() {
  const authUser = await currentUser();
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-gray-100 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">
                Welcome Back {authUser!.fullName} !!
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
