'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Sidebar from '@/components/Sidebar';
import { useSidebarStore } from '@/store/sidebarStore';

export default function SubjectHome({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isOpen } = useSidebarStore();

  useEffect(() => {
    api.get(`/subjects/${subjectId}/first-video`)
      .then(res => {
        router.replace(`/subjects/${subjectId}/video/${res.data.id}`);
      })
      .catch(err => {
        console.error('Failed to get first video', err);
        setLoading(false);
      });
  }, [subjectId, router]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] text-gray-500 animate-in fade-in duration-1000">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500/20 rounded-full" />
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin absolute" />
          <p className="mt-8 text-sm font-bold uppercase tracking-widest animate-pulse">Initializing Course...</p>
        </div>
      ) : (
        <div className="text-center bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2">No Content Available</h2>
          <p>This subject does not have any videos yet.</p>
        </div>
      )}
    </div>
  );
}
