import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthGuard from '@/components/AuthGuard';
import AIAssistant from '@/components/AIAssistant';
import BackgroundOverlay from '@/components/BackgroundOverlay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextLMS - Premium Learning',
  description: 'Production-ready Learning Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white flex flex-col min-h-screen`}>
        <BackgroundOverlay />
        <Navbar />
        <AuthGuard>
          <div className="flex-1">
            {children}
          </div>
          <AIAssistant />
        </AuthGuard>
        <Footer />
      </body>
    </html>
  );
}
