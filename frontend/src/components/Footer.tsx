"use client";

import Link from "next/link";
import { BookOpen, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes("/video/") || pathname.includes("/certificate") || pathname.includes("/exam")) return null;
  return (
    <footer className="relative z-10 bg-white/[0.01] border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center space-x-3 text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            <BookOpen className="text-indigo-400" size={32} />
            <span>NextLMS</span>
          </Link>
          <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
            Empowering learners worldwide with production-ready knowledge and immersive learning experiences. Master the future of technology with us.
          </p>
          <div className="flex space-x-5">
            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-white/10 transition-all border border-white/10">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {["Home", "About", "Free Courses", "Premium", "Contact"].map((link) => (
              <li key={link}>
                <Link href={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Support</h4>
          <ul className="space-y-4">
            {["Help Center", "Community", "Privacy Policy", "Terms of Service"].map((link) => (
              <li key={link}>
                <Link href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
        <span>© 2026 NextLMS. All rights reserved.</span>
        <div className="flex space-x-8">
          <span>Made with ❤️ for Learners</span>
          <div className="flex items-center space-x-2 grayscale opacity-50">
            <span className="font-bold">VISA</span>
            <span className="font-bold">MASTER CARD</span>
            <span className="font-bold">UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
