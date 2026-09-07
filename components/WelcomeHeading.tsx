"use client";

import { useAuthContext } from "@/contexts/AuthContext";

const WelcomeHeading = () => {
  const { user } = useAuthContext();
  return (
    <h1 className="text-2xl md:text-xl font-bold tracking-tight text-zinc-50">
      Welcome back, {user?.name || "John"} 👋
    </h1>
  );
};

export default WelcomeHeading;
