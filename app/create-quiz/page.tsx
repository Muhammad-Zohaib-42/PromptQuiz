import CreateQuizForm from "@/components/CreateQuizForm";
import { ClipboardCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CreateQuizPage() {
  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-50 flex flex-col justify-between py-7 md:py-10 px-4 selection:bg-violet-500/30 selection:text-violet-200">
      {/* Top Simple Nav / Logo bar */}
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between mb-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
        <div className="flex items-center gap-1 md:gap-2">
          <ClipboardCheck size={22} className="text-violet-500" />
          <span className="font-semibold md:font-bold tracking-tight text-lg md:text-base">
            Prompt<span className="text-violet-500">Quiz</span>
          </span>
        </div>
      </div>

      {/* Main Container Card */}
      <section className="flex flex-col bg-transparent md:bg-zinc-900 border border-zinc-800 px-5 md:px-8 py-8 rounded-2xl w-full max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Title */}
        <div className="flex flex-col items-center text-center gap-1.5 mb-8 relative z-10">
          <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-violet-500 shadow-inner mb-1">
            <Sparkles size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Generate AI Quiz
          </h1>
          <p className="text-zinc-400 text-sm max-w-md px-3 md:px-0">
            Configure your parameters below and let our AI engine curate a
            custom test for you.
          </p>
        </div>

        {/* Form */}
        <CreateQuizForm />
      </section>
    </main>
  );
}
