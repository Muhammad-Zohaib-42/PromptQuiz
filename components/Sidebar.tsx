"use client";

import { BarChart3, History, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios"
import { useAuthContext } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Sidebar = ({activeTab, setActiveTab}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const {setUser} = useAuthContext()
  const router = useRouter()

  async function handleLogout() {
    setLoading(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {}, {
        withCredentials: true
      })

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify({...response.data.data.user, isLogin: false}))
        setUser({...response.data.data.user, isLogin: false})
        toast.success("user logout successfully")
        router.push("/")
      }
    } catch(error) {
      console.dir(error)
      console.log(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

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
            <Link
              href="/"
              className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors text-sm font-medium mb-5"
            >
              ← Back to Home
            </Link>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors w-full border ${activeTab == "dashboard" ? "bg-violet-600/10 hover:bg-violet-600/10 text-violet-400 hover:text-violet-400 border-violet-500/20" : "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 border-transparent"}`}
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors w-full border ${activeTab == "history" ? "bg-violet-600/10 hover:bg-violet-600/10 text-violet-400 hover:text-violet-400 border-violet-500/20" : "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 border-transparent"}`}
            >
              <History size={18} />
              <span>Quiz History</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800/80">
          <button onClick={handleLogout} disabled={loading} className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/30 text-zinc-400 hover:text-red-400 font-medium text-sm transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
            {loading && <ClipLoader size={19} color="#ffffff" />}
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
