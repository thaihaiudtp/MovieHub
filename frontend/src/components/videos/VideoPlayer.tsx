
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  Settings
} from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  isHLS?: boolean;
}

const VideoPlayer = ({ src, poster, title, isHLS = false }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);
  
  // Hide controls after inactivity
  useEffect(() => {
    if (!isPlaying) return;
    
    let timeout: number;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };
    
    const playerElement = playerRef.current;
    playerElement?.addEventListener('mousemove', handleMouseMove);
    playerElement?.addEventListener('touchstart', handleMouseMove);
    
    return () => {
      clearTimeout(timeout);
      playerElement?.removeEventListener('mousemove', handleMouseMove);
      playerElement?.removeEventListener('touchstart', handleMouseMove);
    };
  }, [isPlaying]);
  
  // Initialize video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  // Play/Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Mute toggle
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  // Fullscreen toggle
  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;
    
    if (!isFullscreen) {
      if (player.requestFullscreen) {
        player.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };
  
  // Seek in video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const seekTo = (parseFloat(e.target.value) / 100) * video.duration;
    video.currentTime = seekTo;
    setCurrentTime(seekTo);
    setProgress(parseFloat(e.target.value));
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };
  
  // Format time (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  
  // Skip forward/backward
  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime += seconds;
  };
  
  return (
    <div 
      ref={playerRef}
      className="relative w-full aspect-video bg-black overflow-hidden rounded-md video-container"
      onClick={togglePlay}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        playsInline
      />
      
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="h-12 w-12 rounded-full border-4 border-t-movie-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
      )}
      
      {/* Error Message */}
      {videoError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
          <div className="text-white text-center p-4">
            <p className="text-xl mb-2">Video Error</p>
            <p className="text-sm text-gray-300 mb-4">{videoError}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      )}
      
      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/40 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="flex items-center justify-between">
          <div className="text-white font-medium">{title}</div>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={() => {/* Settings menu */}}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Center Play/Pause Button (only visible on pause) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="icon"
              className="bg-white/20 hover:bg-white/30 border-white/30 backdrop-blur-sm h-16 w-16 rounded-full"
              onClick={togglePlay}
            >
              <Play className="h-8 w-8 text-white" fill="white" />
            </Button>
          </div>
        )}
        
        {/* Bottom Controls */}
        <div className="space-y-2">
          {/* Progress Bar */}
          <div className="relative group">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-movie-primary group-hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:opacity-0 transition-opacity"
            />
            <div
              className="absolute top-0 left-0 h-1 bg-movie-primary rounded-full pointer-events-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-white h-8 w-8 hover:bg-white/10"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
                className="text-white h-8 w-8 hover:bg-white/10"
                onClick={() => skip(-10)}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
                className="text-white h-8 w-8 hover:bg-white/10"
                onClick={() => skip(10)}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-2 group relative">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white h-8 w-8 hover:bg-white/10"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                
                {/* Volume Slider (shown on hover) */}
                <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
              </div>
              
              <span className="text-white text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <Button
              size="icon"
              variant="ghost"
              className="text-white h-8 w-8 hover:bg-white/10"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
