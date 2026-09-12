import { useQuizContext } from "@/contexts/QuizContext";
import { ArrowRight, Clock, MessageCircleQuestionMark } from "lucide-react";
import { useRouter } from "next/navigation";

const QuickHistory = ({ loading }) => {
  const {quizes, setCurrentQuiz} = useQuizContext()

  const router = useRouter()

  function handleBtnClick(quiz) {
    setCurrentQuiz(quiz)
    router.push("/quiz")
  }

  function structuredDate(mongoDate) {
    const options = {
  year: 'numeric',
  month: 'short', // 'long' for September, 'short' for Sep
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true, // Set to false for 24-hour format
};

const formattedDate = new Date(mongoDate).toLocaleDateString('en-US', options);

return formattedDate
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        {/* Left 2 Cols: Recent Quiz History */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-3">
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-4"
                >
                  {/* Shimmer Effect Animation Layer */}
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-zinc-800/60 to-transparent pointer-events-none z-10" />

                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {/* Topic badge placeholder */}
                      <div className="h-5 w-16 rounded bg-zinc-800" />
                      {/* Difficulty text placeholder */}
                      <div className="h-3 w-12 rounded bg-zinc-800" />
                    </div>
                    {/* Title placeholder */}
                    <div className="h-4 w-3/4 rounded bg-zinc-800" />
                    {/* Time text placeholder */}
                    <div className="h-3 w-20 rounded bg-zinc-800" />
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    {/* Score placeholder */}
                    <div className="text-right space-y-1">
                      <div className="h-3 w-8 rounded bg-zinc-800 ml-auto" />
                      <div className="h-4 w-10 rounded bg-zinc-800 ml-auto" />
                    </div>
                    {/* Button placeholder */}
                    <div className="w-9 h-9 rounded-xl bg-zinc-800 shrink-0" />
                  </div>
                </div>
              ))}
              {!loading && quizes.length === 0 && (
                <div className="p-8 text-center space-y-3">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                    {/* Optional: Add an icon here like FileQuestion or Inbox */}
                    <MessageCircleQuestionMark />
                  </div>
                  <h4 className="font-semibold text-zinc-200 text-sm">No quizzes found</h4>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                    You haven't completed or been assigned any quizzes yet. Check back later or create a new one.
                  </p>
                </div>
              )}
            {!loading &&
              quizes.map((quiz, i) => (
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
                      <Clock size={12} /> {structuredDate(quiz.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-xs text-zinc-400 block">Score</span>
                      <span className="text-sm font-bold text-violet-400">
                        {quiz.score}
                      </span>
                    </div>
                    <button onClick={() => handleBtnClick(quiz)} className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickHistory;
