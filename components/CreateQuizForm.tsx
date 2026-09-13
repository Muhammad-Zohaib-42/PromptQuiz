"use client";

import { useState, useEffect } from "react";
import { Sparkles, Clock, Layers, Sliders, CheckSquare } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import axios from "axios"
import { useQuizContext } from "@/contexts/QuizContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateQuizForm = () => {
  const [enableTimer, setEnableTimer] = useState(false);
  const [loading, setLoading] = useState(false);

  const {setCurrentQuiz} = useQuizContext()

  const router = useRouter()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Add this effect to handle clearing the value when the timer is toggled off
  useEffect(() => {
    if (!enableTimer) {
      setValue("timer", undefined); // or set it to 0 or null depending on your backend needs
      // Alternatively, you can use: unregister("timer");
    }
  }, [enableTimer, setValue]);

  const submitHandler = async (data) => {
    setLoading(true)

    if (!data.timer) {
      data.timer = 0
    }

    data.timer = Number(data.timer)
    data.length = Number(data.length)

    async function createQuiz() {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz/create`, data, {
        withCredentials: true
      })

      if (response.data.success) {
        setCurrentQuiz(response.data.data.quiz)
        toast.success("Quiz created successfully!")
        setLoading(false)
        router.push("/quiz")
      }
    }

    async function rotateTokens() {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/rotate-tokens`, {}, {
                withCredentials: true
            })

            if (response.data.success) {
              await createQuiz()
            }
        } catch (error) {
            console.log(error.response.data.reason || error.message)
            toast.error("Please Login")
            router.push("/login")
        }
    }

    try {
      await createQuiz()
    } catch(error) {
      if (error.response.data.reason == "Invalid access token" || error.response.data.reason == "access token is required" || error.response.data.message == "Invalid access token" || error.response.data.message == "access token is required") {
        await rotateTokens()
      }
      setLoading(false)
    } finally {
      setLoading(false)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-5 relative z-10"
    >
      {/* Topic / Prompt Input */}
      <div className="flex flex-col gap-1.5 relative">
        <label
          className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
          htmlFor="topic"
        >
          <Sparkles size={14} className="text-violet-400" /> Topic or Custom
          Prompt *
        </label>
        <textarea
          rows={3}
          className={`bg-zinc-800 text-zinc-50 placeholder:text-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 ${errors.topic ? "focus:ring-red-500" : "focus:ring-violet-500"} px-3.5 py-2.5 transition-all rounded-xl text-sm resize-none shadow-inner`}
          id="topic"
          placeholder="e.g. Advanced JavaScript closures, async/await mechanics, and event loops..."
          {...register("topic", { required: "topic is required" })}
        />
        {errors.topic && (
          <span className="absolute top-0 right-0 text-red-400 text-sm">
            {errors.topic.message}
          </span>
        )}
      </div>

      {/* Grid Layout for Question Count & Difficulty Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Question Length */}
        <div className="flex flex-col gap-1.5 relative">
          <label
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
            htmlFor="length"
          >
            <Layers size={14} className="text-violet-400" /> Number of Questions
            *
          </label>
          <select
            id="length"
            className={`bg-zinc-800 text-zinc-50 border border-zinc-700 focus:outline-none focus:ring-2 ${errors.length ? "focus:ring-red-500" : "focus:ring-violet-500"} px-3.5 py-2.5 transition-all rounded-xl text-sm cursor-pointer shadow-inner`}
            {...register("length", {
              required: "Number of Questions is required",
            })}
          >
            <option value="5">5 Questions (Quick)</option>
            <option value="10">10 Questions (Standard)</option>
            <option value="15">15 Questions (Thorough)</option>
            <option value="20">20 Questions (Challenge)</option>
          </select>
          {errors.length && (
            <span className="absolute top-0 right-0 text-red-400 text-sm">
              {errors.length.message}
            </span>
          )}
        </div>

        {/* Difficulty Level (Called "Difficulty Level" or "Challenge Tier") */}
        <div className="flex flex-col gap-1.5 relative">
          <label
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
            htmlFor="difficulty"
          >
            <Sliders size={14} className="text-violet-400" /> Difficulty Level *
          </label>
          <select
            id="difficulty"
            className={`bg-zinc-800 text-violet-400 font-medium border border-zinc-700 focus:outline-none focus:ring-2 ${errors.difficulty ? "focus:ring-red-500" : "focus:ring-violet-500"} px-3.5 py-2.5 transition-all rounded-xl text-sm cursor-pointer shadow-inner`}
            {...register("difficulty", {
              required: "Difficulty Level is required",
            })}
          >
            <option value="normal">Normal (Beginner Friendly)</option>
            <option value="medium">Medium (Balanced)</option>
            <option value="hard">Hard 🔥 (Expert Level)</option>
          </select>
          {errors.difficulty && (
            <span className="absolute top-0 right-0 text-red-400 text-sm">
              {errors.difficulty.message}
            </span>
          )}
        </div>
      </div>

      {/* Additional Feature Ideas Row: Question Format */}
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-1.5 relative">
          <label
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
            htmlFor="questionType"
          >
            <CheckSquare size={14} className="text-violet-400" /> Question
            Format *
          </label>
          <select
            id="questionType"
            className={`bg-zinc-800 text-zinc-50 border border-zinc-700 focus:outline-none focus:ring-2 ${errors.format ? "focus:ring-red-500" : "focus:ring-violet-500"} px-3.5 py-2.5 transition-all rounded-xl text-sm cursor-pointer shadow-inner`}
            {...register("format", { required: "Question Format is required" })}
          >
            <option value="mcq">Multiple Choice (4 Options)</option>
            <option value="true_false">True / False</option>
            <option value="mixed">Mixed Format</option>
          </select>
          {errors.format && (
            <span className="absolute top-0 right-0 text-red-400 text-sm">
              {errors.format.message}
            </span>
          )}
        </div>
      </div>

      {/* Timer Toggle Section */}
      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Clock size={18} className="text-violet-400" />
            <div>
              <span className="text-sm font-semibold block text-zinc-200">
                Per-Question Countdown Timer
              </span>
              <span className="text-xs text-zinc-400">
                Set a strict time limit for answering each question
              </span>
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
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-4 animate-fadeIn relative">
            <label
              className="text-xs text-zinc-300 font-medium"
              htmlFor="timePerQuestion"
            >
              Seconds allowed per question:
            </label>
            <div className="flex items-center gap-2 relative">
              <input
                type="number"
                id="timePerQuestion"
                defaultValue="30"
                className={`w-20 bg-zinc-900 text-center text-zinc-50 border focus:outline-none focus:ring-1 ${errors.timer ? "focus:ring-red-500" : "focus:ring-violet-500"} py-1.5 rounded-lg text-sm`}
                {...register("timer", {
                  required: "Time per question is required",
                  min: 5,
                  max: 120,
                })}
              />
              <span className="text-xs text-zinc-400">sec</span>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-all rounded-xl shadow-lg shadow-violet-950 flex items-center justify-center gap-2 cursor-pointer mt-2 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50"
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
  );
};

export default CreateQuizForm;
