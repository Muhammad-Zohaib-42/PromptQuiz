import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { QuizProvider } from "@/contexts/QuizContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Quiz Generator | Custom Trivia Creator",
  description: "Create custom, AI-powered trivia quizzes instantly by entering any topic or prompt. Choose your question length and difficulty level for a tailored learning and testing experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <QuizProvider>
            <>
              <Toaster />
              {children}
            </>
          </QuizProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
