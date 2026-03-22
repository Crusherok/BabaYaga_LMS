"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, LogOut, User, Menu, X, Search, Bookmark } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (pathname.includes("/video/") || pathname.includes("/certificate") || pathname.includes("/exam")) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Free Courses", href: "/courses/free" },
    { name: "Premium", href: "/courses/premium" },
    { name: "Contact", href: "/contact" },
  ];

  if (user) {
    navLinks.splice(3, 0, { name: "My Courses", href: "/dashboard/my-courses" });
  }

  const isActive = (path: string) => pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const targetPath = pathname.includes("/courses/premium") ? "/courses/premium" : "/courses/free";
      router.push(`${targetPath}?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl px-6 py-4 flex justify-between items-center shadow-2xl">
        <Link href="/" className="flex items-center space-x-3 text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent active:scale-95 transition-transform">
          <BookOpen className="text-indigo-400" size={32} />
          <span>NextLMS</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center relative flex-1 max-w-xs mx-8">
          <Search className="absolute left-3 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search courses..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-2 pl-10 pr-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors group ${
                isActive(link.href) ? "text-indigo-400" : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full ${isActive(link.href) ? "w-full" : ""}`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-medium text-white">{user.name}</span>
                <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">Scholar</span>
              </div>
              <button 
                onClick={logout}
                className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-2xl transition-all border border-red-500/20 active:scale-90"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link href="/login" className="px-5 py-2.5 text-sm font-semibold text-white border border-white/10 rounded-2xl hover:bg-white/5 transition-all">
                Login
              </Link>
              <Link href="/register" className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition-all shadow-lg shadow-indigo-500/20">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium ${isActive(link.href) ? "text-indigo-400" : "text-gray-300"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
