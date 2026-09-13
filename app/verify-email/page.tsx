"use client"

import VerifyEmailForm from "@/components/VerifyEmailForm"
import { useAuthContext } from "@/contexts/AuthContext"
import axios from "axios"
import { ClipboardCheck } from "lucide-react"
import { useEffect } from "react"
import toast from "react-hot-toast"

const page = () => {
  const {user} = useAuthContext()

  useEffect(() => {
    async function getOtp() {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/otp/get`, {params: {email: user.email}})
      } catch (error) {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/otp/send`, {email: user.email})
        toast.success("Please check your email for the OTP verification code")
      }
    }

    getOtp()
  }, [])

  return (
    <main className="h-dvh bg-zinc-950 text-zinc-50 flex items-center justify-center">
        <section className="flex flex-col gap-1 bg-transparent md:bg-zinc-900 py-6 px-6 rounded-lg w-96">
            <div className="flex flex-col items-center gap-1 mb-7 md:mb-5">
                <ClipboardCheck size={44} className="text-violet-500" />
                <h1 className="text-2xl md:text-xl">Verify Your Email</h1>
                <p className="text-zinc-300 text-[12px] md:text-sm">Please enter the verification code sent to your email.</p>
            </div>
            <VerifyEmailForm />
        </section>
    </main>
  )
}

export default page