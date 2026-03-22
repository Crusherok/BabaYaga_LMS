'use client';

import { use } from 'react';
import Sidebar from '@/components/Sidebar';
import { useSidebarStore } from '@/store/sidebarStore';

export default function SubjectLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode, 
  params: Promise<{ subjectId: string }> 
}) {
  const { subjectId } = use(params);
  const { isOpen } = useSidebarStore();

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar subjectId={subjectId} />
      <main className={`flex-1 transition-all duration-300 relative ${isOpen ? 'ml-80' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
}
