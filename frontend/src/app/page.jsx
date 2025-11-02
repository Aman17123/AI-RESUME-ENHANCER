// app/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  // ✅ Create Supabase server client (Next.js 15+ syntax)
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  // 🔍 Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-6">
      {/* Hero Section */}
      <section className="text-center py-20 max-w-3xl">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
          AI Resume Enhancer
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Instantly improve your resume using AI. Optimize language, format, and
          impact to get noticed by recruiters.
        </p>

        {/* ✅ Conditional buttons */}
        {user ? (
          <form action="/api/logout" method="post">
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-red-600 transition-colors"
            >
              Logout ({user.email})
            </button>
          </form>
        ) : (
          <Link
            href="/Auth"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        )}
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 py-16 max-w-5xl w-full">
        {[
          {
            title: "Smart Edits",
            desc: "AI suggests better wording, structure, and phrasing for stronger resumes.",
          },
          {
            title: "ATS Optimization",
            desc: "Make your resume stand out in Applicant Tracking Systems with keyword analysis.",
          },
          {
            title: "Instant Results",
            desc: "Upload your resume and see improvements in seconds — powered by AI.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AI Resume Enhancer. All rights reserved.
      </footer>
    </main>
  );
}
