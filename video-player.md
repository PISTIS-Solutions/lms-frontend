import React, { useRef, useState, useEffect } from 'react';

interface ProtectedVideoPlayerProps {
  videoUrl: string;
  poster?: string;
  userName?: string;
  userId?: string;
  courseTitle?: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  className?: string;
}

const ProtectedVideoPlayer: React.FC<ProtectedVideoPlayerProps> = ({
  videoUrl,
  poster,
  userName = 'User',
  userId,
  courseTitle,
  onProgress,
  onComplete,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Format time helper
  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setCurrentTime(current);
      
      // Call progress callback
      if (onProgress && duration > 0) {
        const progress = (current / duration) * 100;
        onProgress(progress);
      }
    }
  };

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle video ended
  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (onComplete) {
      onComplete();
    }
  };

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setVolume(vol);
      setIsMuted(vol === 0);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (newMutedState) {
        setVolume(0);
      } else {
        setVolume(videoRef.current.volume);
      }
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Change playback speed
  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
      setPlaybackRate(nextRate);
    }
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  // Handle mouse movement (show/hide controls)
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Handle play state change
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowRight':
        e.preventDefault();
        skip(10);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        skip(-10);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.volume = Math.min(1, volume + 0.1);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.volume = Math.max(0, volume - 0.1);
        }
        break;
      case 'f':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'm':
        e.preventDefault();
        toggleMute();
        break;
    }
  };

  return (
    <div 
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        onContextMenu={(e) => e.preventDefault()} // Disable right-click
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        playsInline
        onClick={togglePlay}
      />

      {/* Watermark Overlays */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white text-xs px-3 py-1.5 rounded pointer-events-none z-10">
        👤 {userName}
        {userId && ` (ID: ${userId})`}
      </div>

      <div className="absolute top-4 left-4 text-white text-opacity-40 text-xs pointer-events-none z-10">
        {new Date().toLocaleString()}
      </div>

      {courseTitle && (
        <div className="absolute bottom-20 left-4 text-white text-opacity-30 text-sm font-semibold pointer-events-none z-10">
          {courseTitle}
        </div>
      )}

      <div className="absolute bottom-20 right-4 text-white text-opacity-20 text-xs pointer-events-none z-10">
        © LMS Platform - Authorized Use Only
      </div>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
          onClick={togglePlay}
        >
          <div className="bg-black bg-opacity-50 rounded-full p-6 hover:bg-opacity-70 transition-all">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      )}

      {/* Custom Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-3">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
            }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="hover:text-blue-400 transition-colors p-1"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm8 0a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              )}
            </button>

            {/* Skip Backward */}
            <button 
              onClick={() => skip(-10)}
              className="hover:text-blue-400 transition-colors text-sm p-1"
              title="Rewind 10s (←)"
            >
              ⏪10s
            </button>

            {/* Skip Forward */}
            <button 
              onClick={() => skip(10)}
              className="hover:text-blue-400 transition-colors text-sm p-1"
              title="Forward 10s (→)"
            >
              10s⏩
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className="hover:text-blue-400 transition-colors p-1"
                title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                title="Volume (↑↓)"
              />
            </div>

            {/* Time Display */}
            <span className="text-sm tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Playback Speed */}
            <button 
              onClick={changePlaybackRate}
              className="hover:text-blue-400 transition-colors text-sm px-2 py-1 bg-gray-700 rounded"
              title="Playback Speed"
            >
              {playbackRate}x
            </button>

            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen}
              className="hover:text-blue-400 transition-colors p-1"
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
            >
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 01-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CSS to hide native download button */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
        video::-webkit-media-controls-download-button {
          display: none !important;
        }
        video::-webkit-media-controls-enclosure {
          overflow: hidden;
        }
        video::-internal-media-controls-download-button {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default ProtectedVideoPlayer;







import ProtectedVideoPlayer from './ProtectedVideoPlayer';

function CourseVideoPage() {
  const handleProgress = (progress: number) => {
    console.log(`Video progress: ${progress.toFixed(2)}%`);
    // Save progress to database
  };

  const handleComplete = () => {
    console.log('Video completed!');
    // Mark video as watched in database
  };

  return (
    <ProtectedVideoPlayer
      videoUrl="https://lms-bucket1.s3.us-east-1.amazonaws.com/course-videos/AWS/module-3.mp4"
      poster="https://lms-bucket1.s3.us-east-1.amazonaws.com/thumbnails/module-3-thumb.jpg"
      userName="John Doe"
      userId="USER123"
      courseTitle="AWS Management & Governance"
      onProgress={handleProgress}
      onComplete={handleComplete}
      className="max-w-4xl mx-auto"
    />
  );
}
