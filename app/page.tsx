import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl text-center space-y-6 px-4">
        <h1 className="text-3xl font-bold">
          Reply to client emails faster — without sounding rushed or junior
        </h1>

        <p className="text-gray-600">
          Built for agency founders who still handle client communication
          themselves.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="bg-black text-white px-6 py-3 rounded"
          >
            Start 7-day free trial
          </Link>

          <Link
            href="/login"
            className="border px-6 py-3 rounded"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
