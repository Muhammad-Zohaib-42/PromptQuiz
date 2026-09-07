"use client"

import Dashboard from "@/components/Dashboard";
import QuickHistory from "@/components/QuickHistory";
import Sidebar from "@/components/Sidebar";
import WelcomeHeading from "@/components/WelcomeHeading";
import { Plus } from "lucide-react";
import Link from "next/link";
import {useState} from "react"

export default function Page() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="h-dvh flex bg-zinc-950 text-zinc-50 selection:bg-violet-500/30 selection:text-violet-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row items-center justify-between px-2 md:px-8 pt-18 pb-6 md:py-5 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <div className="text-center md:text-left">
            <WelcomeHeading />
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
          {activeTab == "dashboard" && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab == "history" && <QuickHistory />}
        </main>
      </div>
    </div>
  );
}
