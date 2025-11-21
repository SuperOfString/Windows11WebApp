import React, { useState } from 'react';
import { 
  Presentation, 
  Plus, 
  Play, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  MoreHorizontal,
  Save,
  Undo,
  Redo
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  content: string;
}

const PowerPoint: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, title: "New Presentation", content: "Click to add subtitle" },
  ]);
  const [activeSlideId, setActiveSlideId] = useState<number>(1);

  const activeSlide = slides.find(s => s.id === activeSlideId) || slides[0];

  const addSlide = () => {
    const newId = Math.max(...slides.map(s => s.id)) + 1;
    const newSlide = { id: newId, title: "Click to add title", content: "Click to add text" };
    setSlides([...slides, newSlide]);
    setActiveSlideId(newId);
  };

  const updateSlide = (field: 'title' | 'content', value: string) => {
    setSlides(slides.map(s => 
      s.id === activeSlideId ? { ...s, [field]: value } : s
    ));
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3]">
      {/* Header / Ribbon */}
      <div className="bg-[#C43E1C] text-white flex items-center justify-between px-4 py-2 h-12 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="p-1 bg-white/10 rounded">
             <Presentation className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-sm">Presentation1 - PowerPoint</span>
        </div>
        
        <div className="flex-1 flex justify-center px-4">
           <div className="bg-[#B33616] flex items-center rounded-md px-1">
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent border-none text-xs text-white placeholder-white/70 focus:outline-none py-1 px-2 w-48"
              />
           </div>
        </div>

        <div className="flex items-center space-x-3">
           <button className="p-1 hover:bg-white/10 rounded"><Undo className="w-4 h-4" /></button>
           <button className="p-1 hover:bg-white/10 rounded"><Redo className="w-4 h-4" /></button>
           <div className="h-4 w-px bg-white/30" />
           <button className="text-xs font-medium hover:bg-white/10 px-2 py-1 rounded">User Name</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-2 py-2 flex items-center space-x-4 shadow-sm shrink-0 overflow-x-auto">
         <div className="flex flex-col items-center px-2 cursor-pointer group" onClick={addSlide}>
            <Plus className="w-5 h-5 text-gray-600 group-hover:text-[#C43E1C] mb-1" />
            <span className="text-[10px] text-gray-600">New Slide</span>
         </div>
         <div className="h-8 w-px bg-gray-300" />
         <div className="flex flex-col items-center px-2 cursor-pointer group">
            <Layout className="w-5 h-5 text-gray-600 group-hover:text-[#C43E1C] mb-1" />
            <span className="text-[10px] text-gray-600">Layout</span>
         </div>
         <div className="flex flex-col items-center px-2 cursor-pointer group">
            <Type className="w-5 h-5 text-gray-600 group-hover:text-[#C43E1C] mb-1" />
            <span className="text-[10px] text-gray-600">Text Box</span>
         </div>
         <div className="flex flex-col items-center px-2 cursor-pointer group">
            <ImageIcon className="w-5 h-5 text-gray-600 group-hover:text-[#C43E1C] mb-1" />
            <span className="text-[10px] text-gray-600">Pictures</span>
         </div>
         <div className="h-8 w-px bg-gray-300" />
         <div className="flex flex-col items-center px-2 cursor-pointer group">
            <Play className="w-5 h-5 text-gray-600 group-hover:text-[#C43E1C] mb-1" />
            <span className="text-[10px] text-gray-600">Present</span>
         </div>
         <div className="flex-1" />
         <button className="flex items-center px-3 py-1.5 bg-[#C43E1C] text-white rounded hover:bg-[#a83417] transition-colors">
            <Save className="w-4 h-4 mr-2" />
            <span className="text-xs font-semibold">Share</span>
         </button>
      </div>

      {/* Main Work Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Thumbnails */}
        <div className="w-48 bg-gray-100 border-r border-gray-200 flex flex-col overflow-y-auto p-4 space-y-4 shrink-0">
           {slides.map((slide, index) => (
             <div 
                key={slide.id} 
                onClick={() => setActiveSlideId(slide.id)}
                className={`flex space-x-2 cursor-pointer group`}
             >
                <div className="text-xs text-gray-500 w-4 text-right pt-1">{index + 1}</div>
                <div className={`flex-1 aspect-video bg-white border-2 shadow-sm p-1 flex flex-col overflow-hidden transition-all ${activeSlideId === slide.id ? 'border-[#C43E1C] ring-1 ring-[#C43E1C]/30' : 'border-transparent group-hover:border-gray-300'}`}>
                   <div className="w-full h-1/3 bg-gray-50 mb-1">
                      <div className="text-[4px] text-center pt-1 px-1 truncate text-gray-800 font-bold">{slide.title}</div>
                   </div>
                   <div className="w-full h-full px-1">
                      <div className="text-[3px] text-gray-500 line-clamp-3">{slide.content}</div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Slide Canvas */}
        <div className="flex-1 bg-[#f3f3f3] p-8 overflow-auto flex items-center justify-center relative">
            <div className="aspect-video w-full max-w-4xl bg-white shadow-2xl flex flex-col p-12 relative">
               {/* Editable Title */}
               <div className="mb-8 border border-transparent hover:border-gray-300 hover:border-dashed p-2 group transition-all">
                  <input
                    className="w-full text-4xl font-light text-center text-gray-800 focus:outline-none bg-transparent placeholder-gray-400"
                    value={activeSlide.title}
                    onChange={(e) => updateSlide('title', e.target.value)}
                    placeholder="Click to add title"
                  />
               </div>

               {/* Editable Content */}
               <div className="flex-1 border border-transparent hover:border-gray-300 hover:border-dashed p-2 group transition-all">
                  <textarea
                    className="w-full h-full text-xl text-center text-gray-600 resize-none focus:outline-none bg-transparent placeholder-gray-400 font-light leading-relaxed"
                    value={activeSlide.content}
                    onChange={(e) => updateSlide('content', e.target.value)}
                    placeholder="Click to add subtitle"
                  />
               </div>

               {/* Slide Number Footer */}
               <div className="absolute bottom-4 right-6 text-xs text-gray-400 select-none">
                  {activeSlideId}
               </div>
            </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#C43E1C] text-white h-6 flex items-center justify-between px-2 text-[10px] shrink-0">
         <div className="flex space-x-4">
            <span>Slide {slides.findIndex(s => s.id === activeSlideId) + 1} of {slides.length}</span>
            <span>English (United States)</span>
         </div>
         <div className="flex space-x-4">
            <span>Notes</span>
            <span>Comments</span>
            <span>Run Slide Show</span>
            <span>+ 68% -</span>
         </div>
      </div>
    </div>
  );
};

export default PowerPoint;