import Sidebar from "@/components/Sidebar";
import {
  Trophy,
  Plus,
  ArrowRight,
  Flame,
  BarChart3,
  Clock
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-dvh flex bg-zinc-950 text-zinc-50 selection:bg-violet-500/30 selection:text-violet-200">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row items-center justify-between px-2 md:px-8 pt-18 pb-6 md:py-5 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-xl font-bold tracking-tight text-zinc-50">
              Welcome back, John 👋
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
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Quizzes Completed
                </p>
                <h3 className="text-3xl font-extrabold text-zinc-50 mt-1">
                  18
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-violet-400">
                <Trophy size={22} />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Current Streak
                </p>
                <h3 className="text-3xl font-extrabold text-zinc-50 mt-1">
                  5 Days
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-400">
                <Flame size={22} />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Avg. Accuracy
                </p>
                <h3 className="text-3xl font-extrabold text-zinc-50 mt-1">
                  86%
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-400">
                <BarChart3 size={22} />
              </div>
            </div>
          </div>

          {/* Recent Quizzes & Recommended Section */}
          <div className="grid grid-cols-1 gap-8">
            {/* Left 2 Cols: Recent Quiz History */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-50">
                  Recent Quizzes
                </h2>
                <a
                  href="#"
                  className="text-xs font-medium text-violet-400 hover:underline"
                >
                  View All
                </a>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Advanced React State Patterns & Hooks",
                    topic: "React JS",
                    difficulty: "Hard",
                    score: "9/10",
                    time: "2 hours ago",
                  },
                  {
                    title: "European Renaissance Art & History",
                    topic: "History",
                    difficulty: "Medium",
                    score: "7/10",
                    time: "Yesterday",
                  }
                ].map((quiz, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-violet-400 font-medium">
                          {quiz.topic}
                        </span>
                        <span className="text-xs text-zinc-400">
                          • {quiz.difficulty}
                        </span>
                      </div>
                      <h4 className="font-semibold text-zinc-100 text-sm truncate">
                        {quiz.title}
                      </h4>
                      <p className="text-xs text-zinc-500 flex items-center gap-1">
                        <Clock size={12} /> {quiz.time}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-xs text-zinc-400 block">
                          Score
                        </span>
                        <span className="text-sm font-bold text-violet-400">
                          {quiz.score}
                        </span>
                      </div>
                      <button className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
