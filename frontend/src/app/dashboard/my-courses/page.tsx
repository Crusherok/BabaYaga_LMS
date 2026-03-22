"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import SubjectCard from "@/components/SubjectCard";
import { BookOpen, Sparkles, LayoutDashboard } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function MyCourses() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    api.get("/enroll/my-courses")
      .then(res => {
        setSubjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user, router]);

  return (
    <div className="relative">

      <main className="relative z-10 pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 mb-2">
              <LayoutDashboard size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Student Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              My Learning Path
            </h1>
          </div>
          <div className="hidden sm:block bg-white/5 border border-white/10 rounded-2xl p-4 px-6 text-right">
            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Courses</p>
            <p className="text-2xl font-black text-white">{subjects.length}</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-white/5 rounded-[2.5rem] border border-white/10" />
            ))}
          </div>
        ) : subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((s, idx) => (
              <SubjectCard key={s.id} subject={s} idx={idx} />
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]">
            <BookOpen size={64} className="text-gray-700 mb-6" />
            <h3 className="text-2xl font-bold text-gray-400 mb-4">You haven't enrolled in any courses yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm text-center">Start your journey by exploring our catalog of free and premium courses.</p>
            <div className="flex gap-4">
              <Link href="/courses/free" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20">
                Explore Free
              </Link>
              <Link href="/courses/premium" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all">
                View Premium
              </Link>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

// Separate import for Link to avoid shadowing or other issues if any
import Link from "next/link";
