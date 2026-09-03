"use client";

import { BarChart3, History, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🚀 ULTIMATE MOBILE TOGGLE FIX: Floating at the absolute root layer */}
      <div className="md:hidden fixed top-0 left-0 w-full flex items-center justify-between px-3 py-3 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors text-sm font-medium"
        >
          ← Back to Home
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-100 transition-colors border border-zinc-700 shadow-2xl cursor-pointer active:scale-95"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Component */}
      <aside
        className={`w-64 h-dvh border-r border-zinc-800 bg-zinc-950/90 backdrop-blur-md flex flex-col justify-between fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out md:translate-x-0 md:static shrink-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mt-2">
          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-violet-600/10 text-violet-400 font-medium text-sm border border-violet-500/20"
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 font-medium text-sm transition-colors"
            >
              <History size={18} />
              <span>Quiz History</span>
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800/80">
          <button className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/30 text-zinc-400 hover:text-red-400 font-medium text-sm transition-all cursor-pointer">
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
