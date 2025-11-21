import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Maximize, 
  MoreHorizontal,
  List,
  Film
} from 'lucide-react';

interface VideoFile {
  id: number;
  title: string;
  url: string;
  duration: string;
  thumbnail: string;
}

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(true);

  const playlist: VideoFile[] = [
    { 
      id: 1, 
      title: "Big Buck Bunny", 
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      duration: "09:56",
      thumbnail: "bg-orange-100"
    },
    { 
      id: 2, 
      title: "Elephant Dream", 
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      duration: "10:53",
      thumbnail: "bg-blue-100"
    },
    { 
      id: 3, 
      title: "For Bigger Blazes", 
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      duration: "00:15",
      thumbnail: "bg-red-100"
    }
  ];

  const [currentVideo, setCurrentVideo] = useState<VideoFile>(playlist[0]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentVideo]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const loadVideo = (video: VideoFile) => {
    setCurrentVideo(video);
    setIsPlaying(true);
    setProgress(0);
  };

  return (
    <div className="flex flex-col h-full bg-[#1c1c1c] text-white overflow-hidden">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-white/10 bg-[#1c1c1c] z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-500 p-1.5 rounded-md">
             <Film className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium">Media Player</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col relative bg-black justify-center">
          <video
            ref={videoRef}
            src={currentVideo.url}
            className="w-full h-full max-h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={() => setIsPlaying(!isPlaying)}
            onEnded={() => setIsPlaying(false)}
          />
          
          {/* Overlay Controls (appear on hover - simplified here to always show at bottom of video area) */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity">
             {/* Progress Bar */}
             <div className="flex items-center space-x-3 mb-2 group">
                <span className="text-xs text-gray-300 w-10 text-right">{formatTime(currentTime)}</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={progress} 
                  onChange={handleSeek}
                  className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                />
                <span className="text-xs text-gray-300 w-10">{formatTime(duration)}</span>
             </div>

             {/* Main Buttons */}
             <div className="flex items-center justify-center space-x-6">
                <button className="text-gray-300 hover:text-white"><SkipBack className="w-5 h-5" /></button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
                <button className="text-gray-300 hover:text-white"><SkipForward className="w-5 h-5" /></button>
             </div>

             {/* Volume & Extra Controls */}
             <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2 group">
                   {volume === 0 ? <VolumeX className="w-5 h-5 text-gray-300" /> : <Volume2 className="w-5 h-5 text-gray-300" />}
                   <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={volume} 
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                   />
                </div>
                <button onClick={() => setShowPlaylist(!showPlaylist)} className={`text-gray-300 hover:text-white ${showPlaylist ? 'text-orange-500' : ''}`}>
                  <List className="w-5 h-5" />
                </button>
                <button className="text-gray-300 hover:text-white"><Maximize className="w-5 h-5" /></button>
             </div>
          </div>
        </div>

        {/* Sidebar Playlist */}
        {showPlaylist && (
           <div className="w-64 bg-[#202020] border-l border-white/10 flex flex-col overflow-y-auto shrink-0">
              <div className="p-4 border-b border-white/10">
                 <h3 className="font-semibold text-sm text-gray-200">Playlist</h3>
              </div>
              <div className="p-2 space-y-1">
                 {playlist.map((video) => (
                    <div 
                      key={video.id}
                      onClick={() => loadVideo(video)}
                      className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer group transition-colors ${currentVideo.id === video.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    >
                       <div className={`w-16 h-10 ${video.thumbnail} rounded flex items-center justify-center shrink-0`}>
                          <Film className="w-4 h-4 text-gray-500" />
                       </div>
                       <div className="flex flex-col overflow-hidden">
                          <span className={`text-sm font-medium truncate ${currentVideo.id === video.id ? 'text-orange-400' : 'text-gray-300 group-hover:text-white'}`}>
                            {video.title}
                          </span>
                          <span className="text-xs text-gray-500">{video.duration}</span>
                       </div>
                       {currentVideo.id === video.id && isPlaying && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full ml-auto animate-pulse" />
                       )}
                    </div>
                 ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;