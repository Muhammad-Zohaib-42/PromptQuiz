"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useAuthContext();

  const submitHandler = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
        data,
        {withCredentials: true}
      );

      if (response.data.success) {
        setUser({...response.data.data.user, isLogin: true});
        localStorage.setItem("user", JSON.stringify({...response.data.data.user, isLogin: true}))
        router.push("/dashboard");
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error(error.response?.data?.reason || error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1 relative">
        <label className="relative required w-fit" htmlFor="email">
          Email{" "}
          <span className="text-red-400 absolute -top-0.5 -right-2">*</span>
        </label>
        <input
          className={`bg-zinc-800 text-zinc-50 placeholder:text-zinc-500 border border-zinc-600 focus:outline-none focus:ring ${errors.email ? "focus:ring-red-500" : "focus:ring-violet-500"} px-3 py-1 transition-all rounded-md`}
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address format",
            },
          })}
        />
        {errors.email && (
          <span className="absolute top-0 right-0 text-red-400 text-sm">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 relative">
        <label className="relative required w-fit" htmlFor="password">
          Password{" "}
          <span className="text-red-400 absolute -top-0.5 -right-2">*</span>
        </label>
        <input
          className={`bg-zinc-800 text-zinc-50 placeholder:text-zinc-500 border border-zinc-600 focus:outline-none focus:ring ${errors.password ? "focus:ring-red-500" : "focus:ring-violet-500"} px-3 py-1 transition-all rounded-md`}
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          {...register("password", { required: "Password is required" })}
        />
        <button
          type="button"
          className="absolute right-2 top-[58%] cursor-pointer"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.password && (
          <span className="absolute top-0 right-0 text-red-400 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <button
        disabled={loading}
        className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white cursor-pointer transition-all rounded-md mt-2 flex items-center justify-center gap-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
      >
        {loading && <ClipLoader size={19} color="#ffffff" />}
        <span>Sign In</span>
      </button>
    </form>
  );
};

export default LoginForm;
