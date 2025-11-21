import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Trash2, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
} from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  title: string;
  date: string;
}

const Photos: React.FC = () => {
  const [photos] = useState<Photo[]>([
    { id: 1, url: "https://picsum.photos/id/10/1200/800", title: "Forest Path", date: "Oct 24, 2023" },
    { id: 2, url: "https://picsum.photos/id/11/1200/800", title: "Lake View", date: "Oct 25, 2023" },
    { id: 3, url: "https://picsum.photos/id/12/1200/800", title: "Beach Sands", date: "Oct 26, 2023" },
    { id: 4, url: "https://picsum.photos/id/13/1200/800", title: "City Skyline", date: "Oct 27, 2023" },
    { id: 5, url: "https://picsum.photos/id/14/1200/800", title: "Mountain Peak", date: "Oct 28, 2023" },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  const currentPhoto = photos[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setZoomLevel(1); // Reset zoom on slide change
    setRotation(0); // Reset rotation
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setZoomLevel(1);
    setRotation(0);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.25));
  };

  const handleRotate = () => {
    setRotation((prev) => prev + 90);
  };

  return (
    <div className="flex flex-col h-full bg-[#202020] text-white">
      {/* Header Toolbar */}
      <div className="h-12 flex items-center justify-between px-4 bg-[#2b2b2b] border-b border-[#353535] shrink-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{currentPhoto.title}</span>
          <span className="text-xs text-gray-400 pl-2">{currentPhoto.date}</span>
        </div>
        
        <div className="flex items-center space-x-1">
           <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Zoom In" onClick={handleZoomIn}>
             <ZoomIn className="w-4 h-4" />
           </button>
           <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Zoom Out" onClick={handleZoomOut}>
             <ZoomOut className="w-4 h-4" />
           </button>
           <div className="h-4 w-px bg-gray-600 mx-2" />
           <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Rotate" onClick={handleRotate}>
             <RotateCw className="w-4 h-4" />
           </button>
           <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Delete">
             <Trash2 className="w-4 h-4" />
           </button>
           <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Favorites">
             <Heart className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Main Viewer */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-[#1c1c1c]">
         {/* Image Container */}
         <div className="w-full h-full flex items-center justify-center overflow-auto" style={{ cursor: zoomLevel > 1 ? 'grab' : 'default' }}>
            <img 
              src={currentPhoto.url} 
              alt={currentPhoto.title}
              className="max-w-full max-h-full object-contain transition-transform duration-300 ease-out origin-center"
              style={{ transform: `scale(${zoomLevel}) rotate(${rotation}deg)` }}
            />
         </div>

         {/* Navigation Arrows */}
         <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white/80 hover:text-white transition-all backdrop-blur-sm"
         >
            <ChevronLeft className="w-6 h-6" />
         </button>
         <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white/80 hover:text-white transition-all backdrop-blur-sm"
         >
            <ChevronRight className="w-6 h-6" />
         </button>

         {/* Zoom Indicator Overlay */}
         {zoomLevel !== 1 && (
             <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                 <span className="text-xs font-medium">{Math.round(zoomLevel * 100)}%</span>
             </div>
         )}
      </div>

      {/* Bottom Filmstrip (Thumbnail Preview) */}
      <div className="h-20 bg-[#2b2b2b] border-t border-[#353535] flex items-center justify-center px-4 space-x-2 shrink-0 overflow-x-auto">
         {photos.map((photo, idx) => (
            <button 
                key={photo.id}
                onClick={() => { setCurrentIndex(idx); setZoomLevel(1); setRotation(0); }}
                className={`h-14 w-20 shrink-0 rounded overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-blue-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-80'}`}
            >
                <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
            </button>
         ))}
      </div>
    </div>
  );
};

export default Photos;