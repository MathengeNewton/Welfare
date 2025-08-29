"use client";
import Link from "next/link";
import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function TopNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full h-16 flex items-center justify-between px-8 bg-gray-50 shadow z-20">
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold text-pcea-blue tracking-wide">Welfare Dashboard</span>
      </div>
      <div className="relative">
        <button
          className="flex items-center gap-2 focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open profile menu"
        >
          <UserCircleIcon className="w-8 h-8 text-pcea-gold" />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
            <Link
              href="/profile"
              className="block px-4 py-2 text-pcea-blue hover:bg-pcea-gold hover:text-pcea-blue font-medium"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 text-pcea-red hover:bg-pcea-gold hover:text-pcea-blue font-medium"
              onClick={() => setOpen(false)}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
