import Link from "next/link"

const NotFound = () => {
  return (
    <main className="h-dvh flex flex-col items-center justify-center bg-zinc-950 text-zinc-50">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <Link href="/" className="px-6 py-3 cursor-pointer bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors shadow-lg shadow-violet-950 rounded-full">Go Back Home</Link>
    </main>
  )
}

export default NotFound