'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
  youtubeUrl: string;
  startPositionSeconds: number;
  onProgress: (position: number, completed: boolean) => void;
  onCompleted: () => void;
}

export default function VideoPlayer({
  videoId,
  youtubeUrl,
  startPositionSeconds,
  onProgress,
  onCompleted
}: VideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const getOutputVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytId = getOutputVideoId(youtubeUrl);

  const reportProgress = useCallback(async (isCompleted = false) => {
    if (!playerRef.current) return;
    try {
      const currentTime = await playerRef.current.getCurrentTime();
      if (currentTime > 0) {
        onProgress(Math.floor(currentTime), isCompleted);
        if (isCompleted) onCompleted();
      }
    } catch (err) {
      console.error('Error getting time', err);
    }
  }, [onProgress, onCompleted]);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        reportProgress(false);
      }, 5000);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying, reportProgress]);

  const onReady: YouTubeProps['onReady'] = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    if (startPositionSeconds > 0) {
      event.target.seekTo(startPositionSeconds, true);
    }
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event: YouTubeEvent) => {
    if (event.data === 1) setIsPlaying(true);
    else setIsPlaying(false);

    if (event.data === 2) reportProgress(false);
    if (event.data === 0) reportProgress(true);
  };

  if (!ytId) return <div className="text-red-500 bg-gray-900/50 flex items-center justify-center p-8 rounded-2xl border border-gray-800 aspect-video w-full">Invalid YouTube URL</div>;

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      color: 'white'
    },
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
      <YouTube
        videoId={ytId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  );
}
