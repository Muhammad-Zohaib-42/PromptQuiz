"use client"

import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

const HeroActions = () => {
  const { loading, user } = useAuthContext();

  return (
    <>
      {!loading && (
        <Link
          href={
            !user || !user.isLogin ? "/login" : !user.isVerified ? "/verify-email" : "/dashboard"
          }
          className="px-6 py-3 cursor-pointer bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors shadow-lg shadow-violet-950 rounded-full"
        >
          Get Started Free
        </Link>
      )}
      {loading && (
        <div className="relative overflow-hidden rounded-full bg-zinc-800 border border-zinc-700 px-6 py-3 w-41.75 h-12 flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-zinc-600/50 to-transparent" />
        </div>
      )}
    </>
  );
};

export default HeroActions;
