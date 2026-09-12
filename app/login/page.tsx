import LoginForm from "@/components/LoginForm"
import { ClipboardCheck } from "lucide-react"
import Link from "next/link"

const page = () => {
  return (
    <main className="h-dvh bg-zinc-950 text-zinc-50 flex items-center justify-center px-3 md:px-0">
        <section className="flex flex-col gap-1 bg-transparent md:bg-zinc-900 py-6 px-6 rounded-xl w-96">
            <div className="flex flex-col items-center gap-1 mb-7 md:mb-5">
                <ClipboardCheck size={44} className="text-violet-500" />
                <h1 className="text-2xl md:text-xl">Welcome Back</h1>
                <p className="text-zinc-300 text-[12px] md:text-sm">Enter your credentials to access your account.</p>
            </div>
            <LoginForm />
            <p className="text-zinc-300 mt-3 text-sm">
                Don&apos;t have an account? <Link href="/register" className="text-violet-500 font-medium hover:underline">Create one here</Link>
            </p>
        </section>
    </main>
  )
}

export default page