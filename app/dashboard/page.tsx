"use client"

import Dashboard from "@/components/Dashboard";
import QuickHistory from "@/components/QuickHistory";
import Sidebar from "@/components/Sidebar";
import { useAuthContext } from "@/contexts/AuthContext";
import { useQuizContext } from "@/contexts/QuizContext";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react"
import toast from "react-hot-toast";

export default function Page() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loading, setLoading] = useState(true)

  const {user, loading: authLoading} = useAuthContext()
  const {setQuizes} = useQuizContext()

  const router = useRouter()

  useEffect(() => {
    async function fetchCode() {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz/get-all`, {
          withCredentials: true
        })

        if (response.data.success) {
          setQuizes(response.data.data.quizes)
          setLoading(false)
        }
    }

    async function rotateTokens() {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/rotate-tokens`, {}, {
            withCredentials: true
        })

        if (response.data.success) {
          await fetchCode()
        }
    } catch (error) {
        console.log(error.response.data.reason || error.message)
        toast.error("Please Login")
        router.push("/login")
    }
}

    async function fetchQuizzes() {
      try {
        await fetchCode()
      } catch (error) {
        if (error.response.data.reason == "Invalid access token" || error.response.data.reason == "access token is required" || error.response.data.message == "Invalid access token" || error.response.data.message == "access token is required") {
          await rotateTokens()
        }
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  return (
    <div className="h-dvh flex bg-zinc-950 text-zinc-50 selection:bg-violet-500/30 selection:text-violet-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row items-center justify-between px-2 md:px-8 pt-18 pb-6 md:py-5 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-xl font-bold tracking-tight text-zinc-50">
              Welcome back, {authLoading ? <div className="relative overflow-hidden inline-block h-6 w-20 md:w-40 rounded-md bg-zinc-800/80 mt-1">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-zinc-700/60 to-transparent pointer-events-none z-10" />
            </div> : user?.username || "User"} 👋
            </h1>
            <p className="text-[12px] md:text-xs text-zinc-400 mt-0.5">
              Ready to test your knowledge or generate a new challenge?
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-fit px-3 md:px-0">
            <Link
              href="/create-quiz"
              className="w-full md:w-fit px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-zinc-50 font-medium text-base md:text-sm transition-all shadow-lg shadow-violet-950 flex items-center justify-center gap-2 active:scale-95"
            >
              <Plus size={16} />
              <span>Create New Quiz</span>
            </Link>
          </div>
        </header>

        {/* Dashboard Body Scrollable Content */}
        <main className="flex-1 px-4 py-6 md:p-8 space-y-8 overflow-y-auto">
          {activeTab == "dashboard" && <Dashboard loading={loading} setActiveTab={setActiveTab} />}
          {activeTab == "history" && <QuickHistory loading={loading} />}
        </main>
      </div>
    </div>
  );
}
