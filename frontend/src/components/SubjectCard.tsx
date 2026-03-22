"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, PlayCircle, ShieldCheck, Clock, Users, Sparkles, CheckCircle2 } from "lucide-react";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import CheckoutModal from "./CheckoutModal";

interface Subject {
  id: string;
  title: string;
  description: string;
  is_premium: boolean;
  price?: number;
  category: string;
  level: string;
  instructor: string;
  rating: number;
  enrollment_status?: {
    passed_exam: boolean;
    videos_completed: boolean;
    completed_count: number;
    total_count: number;
  }
}

export default function SubjectCard({ subject, idx }: { subject: Subject; idx: number }) {
  const { user } = useAuthStore();
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    if (user) {
      api.get(`/enroll/${subject.id}/status`)
        .then(res => setEnrolled(res.data.enrolled))
        .catch(() => {});
    }
  }, [subject.id, user]);

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = "/login?msg=" + encodeURIComponent("Please log in to enroll in this course.");
      return;
    }

    if (subject.is_premium) {
      setShowCheckout(true);
    } else {
      processEnrollment();
    }
  };

  const processEnrollment = async () => {
    setLoading(true);
    try {
      await api.post(`/enroll/${subject.id}/enroll`);
      setEnrolled(true);
    } catch (error) {
      console.error("Enrollment failed", error);
      throw error; // For CheckoutModal to catch
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.4)] flex flex-col h-full overflow-hidden ${
      subject.enrollment_status?.passed_exam && subject.enrollment_status?.videos_completed 
        ? "ring-2 ring-emerald-500/20" 
        : ""
    }`}>
      {/* Visual Accents */}
      {/* Visual Accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />

      {/* Header Info */}
      <div className="p-6 pb-0 relative">
        <div className="flex justify-between items-start mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500 shadow-inner ${
            idx % 2 === 0 ? "bg-indigo-500/20 text-indigo-400" : "bg-cyan-500/20 text-cyan-400"
          }`}>
            <Sparkles size={24} />
          </div>
          <div className="flex flex-col items-end gap-2">
            {subject.enrollment_status && (
              <div className="mb-1">
                {subject.enrollment_status.passed_exam && subject.enrollment_status.videos_completed ? (
                  <div className="flex items-center space-x-2 bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={10} strokeWidth={3} />
                    <span>Completed</span>
                  </div>
                ) : subject.enrollment_status.videos_completed ? (
                  <div className="flex items-center space-x-2 bg-indigo-500 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 animate-pulse">
                    <Sparkles size={10} strokeWidth={3} />
                    <span>Exam Pending</span>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-white/10">
                    In Progress
                  </div>
                )}
              </div>
            )}
            {subject.is_premium ? (
              <span className="flex items-center space-x-1.5 bg-amber-500/10 text-amber-500 text-[10px] px-3 py-1 rounded-full border border-amber-500/20 font-bold uppercase tracking-widest">
                <Sparkles size={10} />
                <span>Premium</span>
              </span>
            ) : (
              <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-3 py-1 rounded-full border border-emerald-500/20 font-bold uppercase tracking-widest">
                Free
              </span>
            )}
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">{subject.category}</span>
          </div>
        </div>

        <Link href={`/subjects/${subject.id}`}>
          <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-all leading-tight">
            {subject.title}
          </h2>
        </Link>
        
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed h-10 mb-6 font-light">
          {subject.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 py-4 border-y border-white/5 mb-6 text-[11px] text-gray-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Star className="text-amber-500 fill-amber-500/20" size={14} />
            <span className="text-white">{subject.rating}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{subject.level}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Users size={14} />
            <span>1.2k</span>
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        onConfirm={processEnrollment}
        subject={subject}
      />
      {/* Footer / CTA Area */}
      <div className="mt-auto p-6 pt-0 relative">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Pricing</span>
            <div className="text-xl font-bold text-white">
              {subject.is_premium ? (
                <>₹{subject.price}<span className="text-xs text-gray-500 font-normal ml-1">GST incl.</span></>
              ) : (
                <span className="text-emerald-400">FREE</span>
              )}
            </div>
          </div>

          {enrolled ? (
            <Link 
              href={`/subjects/${subject.id}`}
              className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-indigo-400 px-5 py-3 rounded-2xl transition-all border border-white/10 group-hover:scale-105"
            >
              <CheckCircle2 size={18} />
              <span className="font-bold text-sm">Resume</span>
            </Link>
          ) : (
            <button 
              onClick={handleEnrollClick}
              disabled={loading}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50"
            >
              <PlayCircle size={18} />
              <span className="font-bold text-sm">Enroll Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
