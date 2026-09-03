'use client';

import { useState } from 'react';
import { ClipboardCheck, Sparkles, Clock, Layers, Sliders, HelpCircle, CheckSquare, AlignLeft } from 'lucide-react';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';

export default function CreateQuizPage() {
  const [enableTimer, setEnableTimer] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add your quiz generation trigger/API call here
  };

  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-50 flex flex-col justify-between py-7 md:py-10 px-4 selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* Top Simple Nav / Logo bar */}
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between mb-6">
        <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors text-sm font-medium">
          ← Back to Dashboard
        </Link>
        <div className="flex items-center gap-1 md:gap-2">
          <ClipboardCheck size={22} className="text-violet-500" />
          <span className="font-semibold md:font-bold tracking-tight text-lg md:text-base">Prompt<span className="text-violet-500">Quiz</span></span>
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
          <h1 className="text-2xl font-bold tracking-tight">Generate AI Quiz</h1>
          <p className="text-zinc-400 text-sm max-w-md px-3 md:px-0">
            Configure your parameters below and let our AI engine curate a custom test for you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
          
          {/* Topic / Prompt Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5" htmlFor="topic">
              <Sparkles size={14} className="text-violet-400" /> Topic or Custom Prompt *
            </label>
            <textarea 
              rows={3}
              className="bg-zinc-800 text-zinc-50 placeholder:text-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 px-3.5 py-2.5 transition-all rounded-xl text-sm resize-none shadow-inner" 
              id="topic" 
              name="topic" 
              placeholder="e.g. Advanced JavaScript closures, async/await mechanics, and event loops..." 
              required 
            />
          </div>

          {/* Grid Layout for Question Count & Difficulty Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Question Length */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5" htmlFor="length">
                <Layers size={14} className="text-violet-400" /> Number of Questions
              </label>
              <select 
                id="length" 
                name="length" 
                className="bg-zinc-800 text-zinc-50 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 px-3.5 py-2.5 transition-all rounded-xl text-sm cursor-pointer shadow-inner"
              >
                <option value="5">5 Questions (Quick)</option>
                <option value="10">10 Questions (Standard)</option>
                <option value="15">15 Questions (Thorough)</option>
                <option value="20">20 Questions (Challenge)</option>
              </select>
            </div>

            {/* Difficulty Level (Called "Difficulty Level" or "Challenge Tier") */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5" htmlFor="difficulty">
                <Sliders size={14} className="text-violet-400" /> Difficulty Level
              </label>
              <select 
                id="difficulty" 
                name="difficulty" 
                className="bg-zinc-800 text-violet-400 font-medium border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 px-3.5 py-2.5 transition-all rounded-xl text-sm cursor-pointer shadow-inner"
              >
                <option value="normal">Normal (Beginner Friendly)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="hard">Hard 🔥 (Expert Level)</option>
              </select>
            </div>

          </div>

          {/* Additional Feature Ideas Row: Question Format */}
          <div className="grid grid-cols-1">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5" htmlFor="questionType">
                <CheckSquare size={14} className="text-violet-400" /> Question Format
              </label>
              <select 
                id="questionType" 
                name="questionType" 
                className="bg-zinc-800 text-zinc-50 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 px-3.5 py-2.5 transition-all rounded-xl text-sm cursor-pointer shadow-inner"
              >
                <option value="mcq">Multiple Choice (4 Options)</option>
                <option value="true_false">True / False</option>
                <option value="mixed">Mixed Format</option>
              </select>
            </div>

          </div>

          {/* Timer Toggle Section */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock size={18} className="text-violet-400" />
                <div>
                  <span className="text-sm font-semibold block text-zinc-200">Per-Question Countdown Timer</span>
                  <span className="text-xs text-zinc-400">Set a strict time limit for answering each question</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={enableTimer} 
                  onChange={(e) => setEnableTimer(e.target.checked)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>

            {/* Conditionally rendered timer input */}
            {enableTimer && (
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-4 animate-fadeIn">
                <label className="text-xs text-zinc-300 font-medium" htmlFor="timePerQuestion">
                  Seconds allowed per question:
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    id="timePerQuestion" 
                    name="timePerQuestion" 
                    min={5} 
                    max={120} 
                    defaultValue={30} 
                    className="w-20 bg-zinc-900 text-center text-zinc-50 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-violet-500 py-1.5 rounded-lg text-sm"
                  />
                  <span className="text-xs text-zinc-400">sec</span>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-all rounded-xl shadow-lg shadow-violet-950 flex items-center justify-center gap-2 cursor-pointer mt-2 active:scale-98" 
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <ClipLoader size={18} color="#ffffff" />
                <span>Generating Your AI Quiz...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate & Start Quiz</span>
              </>
            )}
          </button>

        </form>

      </section>

    </main>
  );
}