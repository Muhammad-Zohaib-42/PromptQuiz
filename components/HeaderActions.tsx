"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

const HeaderActions = () => {
  const { loading, user } = useAuthContext();
  
  return (
    <>
      {!loading && !user && (
        <Link
          href="/login"
          className="px-6 py-2 cursor-pointer bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors shadow-lg shadow-violet-950 rounded-full"
        >
          <span className="text-[16px]">Login</span>
        </Link>
      )}
      {!loading && user && user.isVerified && !user.isLogin && (
        <Link
          href="/login"
          className="px-6 py-2 cursor-pointer bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors shadow-lg shadow-violet-950 rounded-full"
        >
          <span className="text-[16px]">Login</span>
        </Link>
      )}
      {!loading && user && !user.isVerified && (
        <Link
          href="/verify-email"
          className="px-6 py-2 cursor-pointer bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors shadow-lg shadow-violet-950 rounded-full"
        >
          <span className="text-[16px]">Verify Email</span>
        </Link>
      )}
      {!loading && user && user.isVerified && user.isLogin && (
        <Link
          href="/dashboard"
          className="px-6 py-2 cursor-pointer bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors shadow-lg shadow-violet-950 rounded-full"
        >
          <span className="text-[16px]">Dashboard</span>
        </Link>
      )}
      {loading && (
        <div className="relative overflow-hidden rounded-full bg-zinc-800 border border-zinc-700 px-6 py-3 w-24 h-10 flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-zinc-600/50 to-transparent" />
        </div>
      )}
    </>
  );
};

export default HeaderActions;
