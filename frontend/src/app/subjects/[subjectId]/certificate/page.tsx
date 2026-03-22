'use client';

import { useEffect, useState, use, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/axios';
import Sidebar from '@/components/Sidebar';
import { useSidebarStore } from '@/store/sidebarStore';
import { Award, Lock, ArrowLeft, Download, Share2 } from 'lucide-react';

export default function CertificatePage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [certData, setCertData] = useState<any>(null);
  const { isOpen } = useSidebarStore();
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!certRef.current) return;
    try {
      const canvas = await html2canvas(certRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${certData.user?.name || 'Student'}_Certificate.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${certData?.subject?.title} Certificate`,
          text: `Check out my official certificate for ${certData?.subject?.title} from NextLMS!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Certificate URL copied to clipboard!');
    }
  };

  useEffect(() => {
    api.get(`/certificate/${subjectId}`)
      .then(res => {
        setCertData(res.data);
      })
      .catch(err => {
        console.error('Failed to get certificate status', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [subjectId]);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-indigo-500/30">
      <Sidebar subjectId={subjectId} />
      <main className={`flex-1 transition-all duration-300 relative ${isOpen ? 'ml-80' : 'ml-0'}`}>
        <div className="max-w-6xl mx-auto p-4 md:p-8 pt-8 relative z-10">
          <div className="w-full relative z-10">
            <Link href={`/subjects/${subjectId}`} className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={20} />
              <span>Back to Course</span>
            </Link>

            {loading ? (
              <div className="animate-pulse flex flex-col items-center py-20">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
              </div>
            ) : !certData?.unlocked ? (
              <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-16 text-center backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8">
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-1 ring-red-500/30">
                  <Lock size={40} className="text-red-400" />
                </div>
                <h1 className="text-3xl lg:text-5xl font-black text-white mb-4">Certificate Locked</h1>
                <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed mb-8">
                  You must complete all 100% of the course videos to unlock your official certificate of completion.
                </p>
                <Link href={`/subjects/${subjectId}`} className="inline-flex bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-indigo-500/20">
                  Continue Learning
                </Link>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">Your Official Certificate</h1>
                  <div className="flex space-x-3 text-sm font-bold">
                    <button onClick={handleShare} className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-5 py-3 rounded-xl border border-white/10 transition-all">
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                    <button onClick={handleDownloadPdf} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
                      <Download size={16} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                <div ref={certRef} className="relative aspect-[1.414/1] w-full bg-[#f8f9fa] rounded-[1rem] p-[2%] shadow-2xl overflow-hidden" style={{ color: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {/* Certificate Border Details */}
                  <div className="absolute inset-4 border-2 rounded-[0.5rem] pointer-events-none" style={{ borderColor: 'rgba(49, 46, 129, 0.1)' }} />
                  <div className="absolute inset-6 border rounded-[0.25rem] pointer-events-none" style={{ borderColor: 'rgba(49, 46, 129, 0.2)' }} />
                  
                  {/* Corner Ornaments */}
                  <div className="absolute top-8 left-8 w-16 h-16 border-t-[3px] border-l-[3px]" style={{ borderColor: '#4f46e5' }} />
                  <div className="absolute top-8 right-8 w-16 h-16 border-t-[3px] border-r-[3px]" style={{ borderColor: '#4f46e5' }} />
                  <div className="absolute bottom-8 left-8 w-16 h-16 border-b-[3px] border-l-[3px]" style={{ borderColor: '#4f46e5' }} />
                  <div className="absolute bottom-8 right-8 w-16 h-16 border-b-[3px] border-r-[3px]" style={{ borderColor: '#4f46e5' }} />

                  <div className="relative h-full flex flex-col items-center justify-center px-12 text-center bg-white rounded-[0.25rem] p-12 shadow-sm">
                    <div className="mb-8">
                      <Award size={64} className="drop-shadow-sm mx-auto" style={{ color: '#4f46e5' }} />
                    </div>
                    
                    <p className="text-sm font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(49, 46, 129, 0.6)' }}>Certificate of Completion</p>
                    
                    <h2 className="text-2xl font-serif italic mb-8" style={{ color: '#6b7280' }}>This is to certify that</h2>
                    
                    <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight capitalize" style={{ fontFamily: 'Georgia, serif', color: '#1e1b4b' }}>
                      {certData.user?.name}
                    </h1>
                    
                    <p className="text-xl mb-4" style={{ color: '#4b5563' }}>has successfully completed all requirements for the course</p>
                    
                    <h3 className="text-3xl font-bold mb-16 max-w-2xl leading-tight" style={{ color: '#312e81' }}>
                      {certData.subject?.title}
                    </h3>
                    
                    <div className="flex justify-between w-full max-w-2xl mt-auto pt-8 border-t" style={{ borderColor: '#e5e7eb' }}>
                      <div className="text-center">
                        <p className="font-medium border-b pb-2 mb-2 w-40 mx-auto" style={{ color: '#1f2937', borderColor: '#d1d5db' }}>
                          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-sm uppercase tracking-widest font-bold" style={{ color: '#6b7280' }}>Date</p>
                      </div>
                      <div className="text-center">
                        <p className="font-serif italic text-xl border-b pb-2 mb-2 w-48 mx-auto" style={{ color: '#312e81', borderColor: '#d1d5db' }}>
                          {certData.subject?.instructor || 'NextLMS Organization'}
                        </p>
                        <p className="text-sm uppercase tracking-widest font-bold" style={{ color: '#6b7280' }}>Instructor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
