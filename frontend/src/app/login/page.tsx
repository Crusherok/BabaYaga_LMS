'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/axios';
import { BookOpen, AlertCircle } from 'lucide-react';



function LoginContent() {
  const searchParams = useSearchParams();
  const msg = searchParams.get('msg');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAccessToken, setUser } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAccessToken(data.accessToken);
      setUser(data.user);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative p-6 pt-32 pb-20">

      <div className="w-full max-w-xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Decorative Accents */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-600/20 rounded-full blur-[100px]" />

          <div className="text-center mb-12 relative z-10">
            <Link href="/" className="inline-flex items-center space-x-3 mb-8 group">
              <BookOpen className="text-indigo-400 group-hover:rotate-12 transition-transform" size={48} />
              <span className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">NextLMS</span>
            </Link>
            <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 font-medium">Continue your journey to mastery</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            {msg && !error && (
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 flex items-center text-indigo-400 text-sm font-medium animate-in fade-in slide-in-from-top-4">
                <AlertCircle size={20} className="mr-3 shrink-0" />
                {msg}
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center text-red-400 text-sm font-medium animate-shake">
                <AlertCircle size={20} className="mr-3 shrink-0" />
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all font-medium"
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Forgot Password?</Link>
              </div>
              <input
                type="password"
                required
                className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all font-medium"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50 text-lg uppercase tracking-widest"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-12 text-center relative z-10 pt-8 border-t border-white/5">
            <p className="text-gray-400 font-medium">
              New to NextLMS?{' '}
              <Link href="/register" className="font-black text-indigo-400 hover:text-indigo-300 transition-colors underline-offset-4 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]" />}>
      <LoginContent />
    </Suspense>
  );
}
