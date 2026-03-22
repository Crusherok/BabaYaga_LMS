"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import SubjectCard from "@/components/SubjectCard";
import { Search, Filter, Sparkles } from "lucide-react";

function PremiumCoursesList() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchParams = useSearchParams();

  const categories = ["All", "Web Dev", "Design", "Data Science", "AI & ML", "DevOps", "Cloud", "Security"];

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) setSearchTerm(query);
  }, [searchParams]);

  useEffect(() => {
    api.get("/subjects")
      .then(res => {
        setSubjects(res.data.filter((s: any) => s.is_premium));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredSubjects = subjects.filter(s => {
    const title = s.title?.toLowerCase() || "";
    const desc = s.description?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    const matchesSearch = title.includes(term) || desc.includes(term);
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="relative z-10 pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-indigo-500/10 text-indigo-400 text-xs px-3 py-1 rounded-full border border-indigo-500/20 font-bold tracking-widest uppercase">
              Premium Catalog
            </span>
            <Sparkles className="text-cyan-400" size={20} />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Advanced Learning
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Professional certification courses with expert instruction and deep-dive content.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search premium courses..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-indigo-500/50 transition-all backdrop-blur-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-3 no-scrollbar items-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all whitespace-nowrap border ${
                selectedCategory === cat 
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-white/5 rounded-[2.5rem] border border-white/10 animate-pulse" />
          ))}
        </div>
      ) : filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((s, idx) => (
            <SubjectCard key={s.id} subject={s} idx={idx} />
          ))}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/20 rounded-[3rem]">
          <Sparkles size={48} className="text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-400">No premium courses found matching your criteria</h3>
        </div>
      )}
    </main>
  );
}

export default function PremiumCourses() {
  return (
    <div className="relative">
      <Suspense fallback={
        <main className="relative z-10 pt-32 pb-20 max-w-7xl mx-auto px-6">
          <div className="h-10 w-64 bg-white/5 rounded-xl animate-pulse mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-white/5 rounded-[2.5rem] border border-white/10 animate-pulse" />)}
          </div>
        </main>
      }>
        <PremiumCoursesList />
      </Suspense>
    </div>
  );
}
