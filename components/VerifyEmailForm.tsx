"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const VerifyEmailForm = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {user, setUser, setAccessToken} = useAuthContext()

  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    const digit = value.replace(/[^0-9]/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    const digits = pasteData.slice(0, 6).split("");

    if (digits.length > 0) {
      const newOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx < 6) {
          newOtp[idx] = digit;
        }
      });
      setOtp(newOtp);

      const targetIndex = Math.min(digits.length - 1, 5);
      inputRefs.current[targetIndex]?.focus();
    }
  };

  async function submitHandler(e) {
    e.preventDefault()
    setLoading(true)

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-email`, {otp: otp.join(""), email: user.email}, {withCredentials: true})

        if (response.data.success) {
            setUser(response.data.data.user)
            setAccessToken(response.data.data.accessToken)
            router.push("/dashboard")
            toast.success("Email verified successfully")
            setLoading(false)
        }
    } catch (error) {
        console.log(error)
        setLoading(false)
    } finally{
        setLoading(false)
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-3">
      <div className="flex gap-1.5 md:gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className="bg-zinc-800 text-zinc-50 border border-zinc-600 focus:outline-none focus:ring focus:ring-violet-500 transition-all rounded-md w-[calc(100%/6)] aspect-square flex items-center justify-center text-2xl px-4 text-center"
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <button
      disabled={loading}
        className="px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white cursor-pointer transition-all rounded-md mt-2 md:mt-1 flex items-center justify-center gap-1 disabled:cursor-not-allowed disbaled:opacity-50"
        type="submit"
      >
        {loading && <ClipLoader size={19} color="#ffffff" />}
        <span>Verify Email</span>
      </button>
    </form>
  );
};

export default VerifyEmailForm;
