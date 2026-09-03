import {
  ClipboardCheck,
  FileQuestion,
  LogIn,
  MessageCircleQuestionMark,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-auto md:h-dvh flex flex-col bg-zinc-950 text-zinc-50 overflow-hidden">
      <header className="flex items-center justify-between px-2 md:px-8 py-4 border-b border-zinc-800/80 shrink-0">
        <div className="flex items-center gap-1">
          <ClipboardCheck size={24} className="text-violet-500" />
          <span className="text-xl mt-0.5 tracking-tight">PromptQuiz</span>
        </div>
        <Link
          href="/login"
          className="px-6 py-2 cursor-pointer bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors shadow-lg shadow-violet-950 rounded-full"
        >
          <span className="text-[16px]">Login</span>
        </Link>
        {/* <Link href="/dashboard" className="px-6 py-2 cursor-pointer bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors shadow-lg shadow-violet-950 rounded-full">
      <span className="text-[16px]">Dashboard</span>
    </Link> */}
      </header>

      <main className="grow grid grid-cols-1 lg:grid-cols-2 items-center px-8 lg:px-16 py-6 md:py-0 gap-12 overflow-hidden">
        {/* Left Column: Intro */}
        <section className="flex flex-col justify-center gap-6 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800/50 text-violet-400 text-xs font-medium w-fit">
            ✨ AI-Powered Quiz Creator
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Turn any topic into an interactive quiz instantly.
          </h1>
          <p className="text-zinc-400 text-base lg:text-lg leading-relaxed">
            Type a prompt, choose your difficulty, and let AI build a custom
            quiz tailored precisely to what you want to learn or test.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="px-6 py-3 cursor-pointer bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors shadow-lg shadow-violet-950 rounded-full"
            >
              Get Started Free
            </Link>
          </div>
        </section>

        {/* Right Column: Interactive Generator Preview Card */}
        <section className="w-full flex items-end justify-center relative">
          <MessageCircleQuestionMark
            className="absolute top-0 right-10 md:right-40"
            size={40}
          />
          <Image src="/robot.png" alt="robot" height={450} width={450} />
        </section>
      </main>
    </div>
  );
}
