import { ArrowRight, Clock } from "lucide-react";

const QuickHistory = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        {/* Left 2 Cols: Recent Quiz History */}
        <div className="lg:col-span-2 space-y-4">
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
              },
              {
                title: "European Renaissance Art & History",
                topic: "History",
                difficulty: "Medium",
                score: "7/10",
                time: "Yesterday",
              },
              {
                title: "European Renaissance Art & History",
                topic: "History",
                difficulty: "Medium",
                score: "7/10",
                time: "Yesterday",
              },
              {
                title: "European Renaissance Art & History",
                topic: "History",
                difficulty: "Medium",
                score: "7/10",
                time: "Yesterday",
              },
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
                    <span className="text-xs text-zinc-400 block">Score</span>
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
    </>
  );
};

export default QuickHistory;
