import { ClipboardCheck } from "lucide-react"
import { ClipLoader } from "react-spinners"

const page = () => {
  return (
    <main className="h-dvh bg-zinc-950 text-zinc-50 flex items-center justify-center">
        <section className="flex flex-col gap-1 bg-transparent md:bg-zinc-900 py-6 px-6 rounded-lg w-96">
            <div className="flex flex-col items-center gap-1 mb-7 md:mb-5">
                <ClipboardCheck size={44} className="text-violet-500" />
                <h1 className="text-2xl md:text-xl">Verify Your Email</h1>
                <p className="text-zinc-300 text-[12px] md:text-sm">Please enter the verification code sent to your email.</p>
            </div>
            <form className="flex flex-col gap-3">
                <div className="flex gap-1.5 md:gap-3">
                    <input className="bg-zinc-800 text-zinc-50 border border-zinc-600 focus:outline-none focus:ring focus:ring-violet-500 transition-all rounded-md w-[calc(100%/6)] aspect-square flex items-center justify-center text-2xl px-4" type="text" />
                    <input className="bg-zinc-800 text-zinc-50 border border-zinc-600 focus:outline-none focus:ring focus:ring-violet-500 transition-all rounded-md w-[calc(100%/6)] aspect-square flex items-center justify-center text-2xl px-4" type="text" />
                    <input className="bg-zinc-800 text-zinc-50 border border-zinc-600 focus:outline-none focus:ring focus:ring-violet-500 transition-all rounded-md w-[calc(100%/6)] aspect-square flex items-center justify-center text-2xl px-4" type="text" />
                    <input className="bg-zinc-800 text-zinc-50 border border-zinc-600 focus:outline-none focus:ring focus:ring-violet-500 transition-all rounded-md w-[calc(100%/6)] aspect-square flex items-center justify-center text-2xl px-4" type="text" />
                    <input className="bg-zinc-800 text-zinc-50 border border-zinc-600 focus:outline-none focus:ring focus:ring-violet-500 transition-all rounded-md w-[calc(100%/6)] aspect-square flex items-center justify-center text-2xl px-4" type="text" />
                    <input className="bg-zinc-800 text-zinc-50 border border-zinc-600 focus:outline-none focus:ring focus:ring-violet-500 transition-all rounded-md w-[calc(100%/6)] aspect-square flex items-center justify-center text-2xl px-4" type="text" />
                </div>
                <button className="px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white cursor-pointer transition-all rounded-md mt-2 md:mt-1 flex items-center justify-center gap-1" type="submit">
                    <ClipLoader size={19} color="#ffffff" />
                    <span>Verify Email</span>
                </button>
            </form>
        </section>
    </main>
  )
}

export default page