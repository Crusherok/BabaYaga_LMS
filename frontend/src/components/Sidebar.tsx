'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '../store/sidebarStore';
import {
  Menu,
  ChevronRight,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Lock,
  LogOut,
  User as UserIcon,
  Award,
  BrainCircuit,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/axios';

interface SubjectTree {
  id: string;
  title: string;
  sections: {
    id: string;
    title: string;
    videos: {
      id: string;
      title: string;
      duration_seconds: number;
    }[];
  }[];
}

interface SidebarProps {
  subjectId?: string;
  currentVideoId?: string;
}

export default function Sidebar({ subjectId, currentVideoId }: SidebarProps) {
  const { isOpen, toggle } = useSidebarStore();
  const { user, logout } = useAuthStore();
  const [subject, setSubject] = useState<SubjectTree | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  useEffect(() => {
    if (subjectId) {
      api.get(`/subjects/${subjectId}/tree`).then(res => setSubject(res.data)).catch(console.error);
    }
  }, [subjectId]);

  useEffect(() => {
    if (subjectId) {
      api.get(`/progress/subjects/${subjectId}`).then(res => {
        const progMap: Record<string, boolean> = {};
        res.data.forEach((p: any) => {
          progMap[p.video_id] = p.is_completed;
        });
        setProgress(progMap);
      }).catch(console.error);
    }
  }, [subjectId, currentVideoId]);

  const flatVideos = useMemo(() => subject?.sections.flatMap(s => s.videos) || [], [subject]);
  
  const isVideoUnlocked = (videoId: string, index: number) => {
    if (index === 0) return true;
    const prevVideo = flatVideos[index - 1];
    return progress[prevVideo.id] === true;
  };

  const totalVideos = flatVideos.length;
  const completedVideos = flatVideos.filter(v => progress[v.id]).length;
  const progressPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

  const menuContent = useMemo(() => subject?.sections.map((section, sIdx) => {
    const previousVideosCount = subject.sections.slice(0, sIdx).reduce((acc, s) => acc + s.videos.length, 0);

    return (
      <div key={section.id} className="space-y-2">
        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider px-2 mb-3">
          {section.title}
        </h3>
        <div className="space-y-1">
          {section.videos.map((video, vIdx) => {
            const flatIdx = previousVideosCount + vIdx;
            const unlocked = isVideoUnlocked(video.id, flatIdx);
            const completed = progress[video.id];
            const active = currentVideoId === video.id;

            return (
              <Link 
                key={video.id}
                href={unlocked ? `/subjects/${subjectId}/video/${video.id}` : '#'}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  active 
                    ? 'bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/20' 
                    : unlocked 
                      ? 'text-gray-300 hover:bg-white/5 hover:text-white' 
                      : 'text-gray-600 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex-shrink-0">
                  {completed ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : !unlocked ? (
                    <Lock size={18} className="text-gray-600" />
                  ) : (
                    <PlayCircle size={18} className={active ? 'text-indigo-400' : 'text-gray-400 group-hover:text-indigo-300'} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{video.title}</p>
                  <p className="text-xs opacity-60 mt-0.5">{Math.floor(video.duration_seconds / 60)}:{String(video.duration_seconds % 60).padStart(2, '0')}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }), [subject, progress, currentVideoId, isVideoUnlocked, subjectId]);

  if (!isOpen) {
    return (
      <button 
        onClick={toggle}
        className="fixed top-4 left-4 z-50 p-2 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-white transition-all shadow-lg"
      >
        <Menu size={24} />
      </button>
    );
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-80 bg-[#0f0f11]/90 backdrop-blur-xl border-r border-white/5 text-white flex flex-col transition-all duration-300">
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
        <Link href="/" className="flex items-center space-x-3 font-semibold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent active:scale-95 transition-transform">
          <BookOpen className="text-indigo-400" size={24} />
          <span>NextLMS</span>
        </Link>
        <button onClick={toggle} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-4 px-4 space-y-6">
        {!subjectId ? (
          <div className="text-gray-400 text-sm px-2">Select a subject to view curriculum.</div>
        ) : (
          <div className="space-y-6 flex-1 pb-16">
            <h2 className="text-lg font-bold px-2 tracking-tight">{subject?.title}</h2>
            
            {totalVideos > 0 && (
              <div className="px-2 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Course Progress</span>
                  <span className="text-xs font-bold text-indigo-400">{progressPercentage}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-1000 relative"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            )}
            
            {menuContent}

            {/* Certification Links */}
            {totalVideos > 0 && (
              <div className="pt-4 mt-6 border-t border-white/5 px-2 space-y-2">
                <Link
                  href={`/subjects/${subjectId}/exam`}
                  className={`group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 shadow-sm ${
                    completedVideos === totalVideos
                      ? 'bg-gradient-to-r from-orange-500/10 to-rose-500/10 border-orange-500/20 text-orange-300 ring-1 ring-orange-500/20 hover:from-orange-500/20 hover:to-rose-500/20 hover:shadow-orange-500/10'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  } border`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`p-1.5 rounded-lg transition-colors duration-300 ${
                      completedVideos === totalVideos ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white/10 text-gray-500'
                    }`}>
                      <BrainCircuit size={18} />
                    </div>
                    <span className="text-sm font-bold">AI Course Exam</span>
                  </div>
                  <ChevronRight size={16} className={`transition-transform duration-300 group-hover:translate-x-1 ${
                      completedVideos === totalVideos ? 'text-orange-400' : 'text-gray-600'
                  }`} />
                </Link>

                <Link
                  href={`/subjects/${subjectId}/certificate`}
                  className="group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 shadow-sm bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 border"
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="p-1.5 rounded-lg transition-colors duration-300 bg-white/10 text-gray-500">
                      <Award size={18} />
                    </div>
                    <span className="text-sm font-bold">View Certificate</span>
                  </div>
                  <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 text-gray-600" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 ring-1 ring-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-inner">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
          <button onClick={logout} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
