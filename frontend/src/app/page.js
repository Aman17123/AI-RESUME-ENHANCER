export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-6">
      {/* Hero Section */}
      <section className="text-center py-20 max-w-3xl">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          AI Resume Enhancer
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Instantly improve your resume using AI. Optimize language, format, and impact to get noticed by recruiters.
        </p>
        <a
          href="#get-started"
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
        >
          Try It Free
        </a>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 py-16 max-w-5xl w-full">
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Smart Edits</h3>
          <p className="text-gray-600">
            AI suggests better wording, structure, and phrasing for stronger resumes.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">ATS Optimization</h3>
          <p className="text-gray-600">
            Make your resume stand out in Applicant Tracking Systems with keyword analysis.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
          <p className="text-gray-600">
            Upload your resume and see improvements in seconds — powered by AI.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500">
        © {new Date().getFullYear()} AI Resume Enhancer. All rights reserved.
      </footer>
    </main>
  );
}
