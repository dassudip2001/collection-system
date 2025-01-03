"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

// Client component to handle the mobile menu state
export default function Navbar() {
  const currentPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/color-palette.png"
            className="h-8"
            alt="Flowbite Logo"
            width={40}
            height={40}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Drawing App
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
        >
          <ul className="font-medium flex flex-col pt-4 md:p-0 mt-4 bg-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white-300 dark:bg-gray-800 md:dark:bg-white dark:border-gray-700">
            <li>
              <Link
                href="/posts"
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  currentPath === "/posts" ? "text-blue-700" : ""
                }`}
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                href="/category"
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  currentPath === "/category" ? "text-blue-700" : ""
                }`}
              >
                Category
              </Link>
            </li>
            <li className="py-2 px-3 md:p-0">
              <div className="flex space-x-1">
                <LogOut />
                <SignOutButton />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
