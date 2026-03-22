'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Sidebar from '@/components/Sidebar';
import VideoPlayer from '@/components/VideoPlayer';
import { useSidebarStore } from '@/store/sidebarStore';
import { ChevronLeft, ChevronRight, CheckCircle2, PlaySquare, Bookmark } from 'lucide-react';

export default function VideoPage({ params }: { params: Promise<{ subjectId: string, videoId: string }> }) {
  const { subjectId, videoId } = use(params);
  const router = useRouter();
  const { isOpen } = useSidebarStore();
  const [video, setVideo] = useState<any>(null);
  const [progress, setProgress] = useState<{ last_position_seconds: number, is_completed: boolean } | null>(null);

  useEffect(() => {
    Promise.all([
      api.get(`/videos/${videoId}`).then(res => res.data),
      api.get(`/progress/videos/${videoId}`).then(res => res.data)
    ]).then(([videoData, progressData]) => {
      setVideo(videoData);
      setProgress(progressData);
    }).catch(console.error);
  }, [videoId]);

  const handleProgress = async (position: number, completed: boolean) => {
    try {
      await api.post(`/progress/videos/${videoId}`, {
        last_position_seconds: position,
        is_completed: completed
      });
      setProgress(prev => prev ? { ...prev, last_position_seconds: completed ? 0 : position, is_completed: completed || prev.is_completed } : null);
    } catch (err) {
      console.error('Failed to save progress.', err);
    }
  };

  const handleCompleted = async () => {
    await handleProgress(0, true);
    if (video?.next_video_id) {
      router.push(`/subjects/${subjectId}/video/${video.next_video_id}`);
    }
  };

  const navigateTo = (vidId: string) => {
    router.push(`/subjects/${subjectId}/video/${vidId}`);
  };

  const [notes, setNotes] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${videoId}`);
    if (savedNotes) setNotes(savedNotes);
  }, [videoId]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem(`notes-${videoId}`, newNotes);
    setSaveStatus("Saved");
    setTimeout(() => setSaveStatus(""), 2000);
  };

  if (!video || !progress) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-500/20 rounded-full" />
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          <p className="mt-20 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">Loading Video</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center text-sm mb-3 space-x-3">
            <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-widest text-[10px] font-bold shadow-inner">
              {video.section?.title}
            </span>
            {progress.is_completed && (
              <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 text-[10px] font-bold shadow-inner uppercase tracking-widest">
                <CheckCircle2 size={12} className="mr-1.5" />
                Lesson Completed
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">{video.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="shadow-2xl shadow-indigo-500/10 rounded-3xl border border-white/5 bg-black/40 p-2 backdrop-blur-sm">
            <div className="relative rounded-2xl overflow-hidden bg-black ring-1 ring-white/10 aspect-video">
              <VideoPlayer
                videoId={video.id}
                youtubeUrl={video.youtube_url}
                startPositionSeconds={progress.is_completed ? 0 : progress.last_position_seconds}
                onProgress={handleProgress}
                onCompleted={handleCompleted}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <button 
              onClick={() => video.previous_video_id && navigateTo(video.previous_video_id)}
              disabled={!video.previous_video_id}
              className="flex items-center px-6 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] disabled:opacity-20 transition-all font-bold border border-white/10"
            >
              <ChevronLeft size={18} className="mr-2" />
              <span>PREVIOUS</span>
            </button>
            <button 
              onClick={() => video.next_video_id && navigateTo(video.next_video_id)}
              disabled={!video.next_video_id}
              className="flex items-center px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 transition-all font-bold shadow-lg shadow-indigo-500/20"
            >
              <span>NEXT LESSON</span>
              <ChevronRight size={18} className="ml-2" />
            </button>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
            <h3 className="text-xl font-black mb-4 flex items-center">
              <PlaySquare size={20} className="mr-3 text-indigo-400" />
              Lesson Overview
            </h3>
            <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{video.description}</p>
          </div>
        </div>

        {/* Notes Sidebar */}
        <div className="space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center">
                <Bookmark size={20} className="mr-3 text-cyan-400" />
                Personal Notes
              </h3>
              {saveStatus && <span className="text-[10px] uppercase font-bold text-emerald-400 animate-pulse">{saveStatus}</span>}
            </div>
            <textarea 
              className="flex-1 w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-sm text-gray-300 outline-none focus:border-indigo-500/30 transition-all resize-none font-medium h-96 custom-scrollbar"
              placeholder="Type your notes here... they are saved automatically."
              value={notes}
              onChange={handleNotesChange}
            />
            <p className="mt-4 text-[10px] text-gray-500 uppercase font-black tracking-widest text-center">Persists in Local Storage</p>
          </div>
        </div>
      </div>
    </div>
  );
}
