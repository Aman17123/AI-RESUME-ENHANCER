"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, LogOut, FileText, Trash2 } from "lucide-react";
import { createClient } from "../../lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const client = createClient();
    setSupabase(client);
    client.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login");
        return;
      }
      setUser(data.user);
      loadResumes(client, data.user.id);
    });
  }, [router]);

  const loadResumes = async (client, userId) => {
    setLoading(true);
    try {
      const { data } = await client
        .from("resumes")
        .select("id, name, template, updated_at, created_at")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });
      setResumes(data || []);
    } catch {
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase?.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleDelete = async (id) => {
    if (!supabase) return;
    const ok = window.confirm("Delete this resume? This cannot be undone.");
    if (!ok) return;
    await supabase.from("resumes").delete().eq("id", id);
    setResumes((r) => r.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white text-sm font-bold">
            A
          </span>
          <h1 className="text-lg font-bold text-slate-900">AchiVAI Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm text-slate-500 hidden sm:block">
              {user.email}
            </span>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">My Resumes</h2>
            <p className="text-sm text-slate-500 mt-1">
              Pick a template or edit a saved resume.
            </p>
          </div>

          <Link
            href="/template"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4" /> New Resume
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-slate-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-700">No resumes yet</h3>
            <p className="text-sm text-slate-500 mt-1 mb-6">
              Create your first resume with one of our ATS-friendly templates.
            </p>
            <Link
              href="/template"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              <Plus className="h-4 w-4" /> Create a Resume
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-10 h-12 bg-slate-100 rounded border border-slate-200 flex items-center justify-center mb-4">
                    <FileText className="h-5 w-5 text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 truncate">
                    {r.name || "Untitled Resume"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 capitalize">
                    {r.template} template
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Link
                    href={`/template/${r.template}?resume=${r.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    aria-label="Delete resume"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}