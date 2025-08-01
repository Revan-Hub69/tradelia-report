// pages/index.jsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <Link
        href="/html-generator"
        className="bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold px-6 py-3 rounded shadow"
      >
        Vai al Generatore Tradelia AI
      </Link>
    </main>
  );
}
