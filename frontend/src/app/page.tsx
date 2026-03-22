"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import SubjectCard from "@/components/SubjectCard";
import { Sparkles, BookOpen, GraduationCap, ShieldCheck, Zap, ArrowRight, Play, Star, CheckCircle } from "lucide-react";

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/subjects")
      .then(res => {
        setFeaturedCourses(res.data.filter((s: any) => s.is_premium).slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const features = [
    {
      title: "100+ Free Courses",
      description: "Build a strong foundation with our extensive library of expert-led free content.",
      icon: BookOpen,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10"
    },
    {
      title: "Premium Certification",
      description: "Get industry-recognized certificates upon completion of advanced tracks.",
      icon: GraduationCap,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
    {
      title: "Secure Payments",
      description: "Encrypted transactions and instant access via UPI, Card, or Bank Transfer.",
      icon: ShieldCheck,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}

      {/* Hero Section */}
      <section className="relative z-10 pt-48 pb-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-400 animate-in fade-in slide-in-from-left-4 duration-1000">
              <Sparkles size={16} />
              <span className="text-sm font-bold tracking-widest uppercase">The Future of Learning</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight">
              Unlock Your <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Potential</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed font-light">
              Join 100,000+ learners mastering the world's most in-demand skills. From Web Dev to AI, your journey to excellence starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses/free" className="group px-8 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-[2rem] font-bold flex items-center justify-center space-x-3 transition-all shadow-2xl shadow-indigo-500/40">
                <span>Free Courses</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/courses/premium" className="px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] font-bold flex items-center justify-center space-x-3 transition-all backdrop-blur-xl">
                <span>Premium Access</span>
                <Zap size={20} className="text-amber-400" />
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full group-hover:bg-indigo-400/30 transition-all duration-1000" />
            <div className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 shadow-2xl overflow-hidden group-hover:border-white/20 transition-all duration-500">
              <div className="aspect-video bg-indigo-900/20 rounded-[2.5rem] border border-white/5 flex items-center justify-center relative overflow-hidden group/image">
                <img src="/generative_ai.png" alt="Generative AI Course" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/image:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-80" />
                <div className="w-20 h-20 rounded-full bg-indigo-600/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-indigo-500/50 group-hover/image:scale-110 transition-transform cursor-pointer relative z-10">
                  <Play className="text-white fill-white ml-1" size={32} />
                </div>
              </div>
              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1px]">
                      <div className="w-full h-full bg-[#0a0a0a] rounded-2xl flex items-center justify-center">
                        <BookOpen size={24} className="text-indigo-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-bold">Latest: Generative AI</p>
                      <p className="text-xs text-gray-500">Master LLMs & Transformers</p>
                    </div>
                  </div>
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-indigo-500 flex items-center justify-center text-[10px] font-bold">
                        {i === 4 ? "+5k" : ""}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div key={i} className="group p-10 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[3rem] hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-4">
              <div className={`w-16 h-16 ${feat.bg} ${feat.color} rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                <feat.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Premium Courses</h2>
            <p className="text-gray-400 text-lg max-w-2xl">Advanced learning paths designed for your professional career growth.</p>
          </div>
          <Link href="/courses/premium" className="flex items-center space-x-3 text-indigo-400 font-bold group hover:text-indigo-300 transition-colors">
            <span>Explore All Premium</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1,2,3].map(i => (
              <div key={i} className="h-80 bg-white/5 rounded-[3rem] animate-pulse border border-white/10" />
            ))
          ) : featuredCourses.length > 0 ? (
            featuredCourses.map((course, idx) => (
              <SubjectCard key={course.id} subject={course} idx={idx} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]">
              <Sparkles size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 font-medium text-lg">Premium courses are coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust / Social Proof */}
      <section className="relative z-10 py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <p className="text-gray-500 uppercase tracking-[0.3em] font-bold text-sm">Trusted by Industry Experts</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
            {["Google", "Meta", "Amazon", "Microsoft", "Netflix"].map(brand => (
              <span key={brand} className="text-3xl md:text-4xl font-black text-white">{brand}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
