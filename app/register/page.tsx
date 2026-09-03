import { ClipboardCheck } from "lucide-react"
import Link from "next/link"
import { ClipLoader } from "react-spinners"

const page = () => {
  return (
    <main className="h-dvh bg-zinc-950 text-zinc-50 flex items-center justify-center px-3 md:px-0">
        <section className="flex flex-col gap-1 bg-transparent md:bg-zinc-900 py-6 px-6 rounded-xl w-96">
            <div className="flex flex-col items-center gap-1 mb-7 md:mb-5">
                <ClipboardCheck size={44} className="text-violet-500" />
                <h1 className="text-2xl md:text-xl">Create Your Account</h1>
                <p className="text-zinc-300 text-[12px] md:text-sm">Fill in the details below to create your account.</p>
            </div>
            <form className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="relative required w-fit" htmlFor="name">Name <span className="text-red-400 absolute -top-0.5 -right-2">*</span></label>
                    <input className="bg-zinc-800 text-zinc-50 placeholder:text-zinc-500 border border-zinc-600 focus:outline-none focus:ring focus:ring-violet-500 px-3 py-1 transition-all rounded-md" type="text" id="name" name="name" required />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="relative required w-fit" htmlFor="email">Email <span className="text-red-400 absolute -top-0.5 -right-2">*</span></label>
                    <input className="bg-zinc-800 text-zinc-50 placeholder:text-zinc-500 border border-zinc-600 focus:outline-none focus:ring focus:ring-violet-500 px-3 py-1 transition-all rounded-md" type="email" id="email" name="email" required />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="relative required w-fit" htmlFor="password">Password <span className="text-red-400 absolute -top-0.5 -right-2">*</span></label>
                    <input className="bg-zinc-800 text-zinc-50 placeholder:text-zinc-500 border border-zinc-600 focus:outline-none focus:ring focus:ring-violet-500 px-3 py-1 transition-all rounded-md" type="password" id="password" name="password" required />
                </div>
                <button className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white cursor-pointer transition-all rounded-md mt-2 flex items-center justify-center gap-1" type="submit">
                    <ClipLoader size={19} color="#ffffff" />
                    <span>Create Account</span>
                </button>
            </form>
            <p className="text-zinc-300 mt-3 text-sm">
                Already have an account? <Link href="/login" className="text-violet-500 font-medium hover:underline">Login here</Link>
            </p>
        </section>
    </main>
  )
}

export default page