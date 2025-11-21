import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Lock, Star } from 'lucide-react';

const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org/');
  const [inputUrl, setInputUrl] = useState('https://www.wikipedia.org/');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl;
    if (!target.startsWith('http')) {
      target = 'https://' + target;
    }
    setUrl(target);
    setIsLoading(true);
  };

  return (
    <div className="flex flex-col h-full bg-white">
        {/* Tab Bar (Fake) */}
        <div className="h-9 bg-[#dee1e6] flex items-end px-2 pt-1 space-x-1">
            <div className="w-48 bg-white rounded-t-md h-full p-2 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-gray-700 font-medium truncate">Wikipedia</span>
                </div>
                <button className="hover:bg-gray-200 rounded p-0.5">×</button>
            </div>
            <button className="h-6 w-6 flex items-center justify-center hover:bg-gray-300 rounded">+</button>
        </div>

        {/* Address Bar */}
        <div className="bg-white border-b border-gray-200 p-2 flex items-center space-x-3">
            <div className="flex space-x-1 text-gray-500">
                <button className="p-1.5 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-gray-100 rounded-full"><ArrowRight className="w-4 h-4" /></button>
                <button onClick={() => setIsLoading(true)} className="p-1.5 hover:bg-gray-100 rounded-full"><RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /></button>
            </div>
            <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500"><Home className="w-4 h-4" /></button>
            
            <form onSubmit={handleNavigate} className="flex-1">
                <div className="relative flex items-center w-full bg-[#f1f3f4] rounded-full px-3 py-1.5 group focus-within:bg-white focus-within:shadow focus-within:ring-2 focus-within:ring-blue-200 border border-transparent focus-within:border-blue-400 transition-all">
                    <Lock className="w-3 h-3 text-gray-500 mr-2" />
                    <input 
                        type="text" 
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                    />
                    <Star className="w-4 h-4 text-gray-400 cursor-pointer hover:text-yellow-500" />
                </div>
            </form>
        </div>

        {/* Content */}
        <div className="flex-1 relative bg-gray-50">
            <iframe 
                src={url} 
                className="w-full h-full border-none"
                title="Browser View"
                onLoad={() => setIsLoading(false)}
                sandbox="allow-scripts allow-same-origin allow-forms"
            />
             {/* Warning overlay if iframe refuses to load (common with x-frame-options) - Visual only assumption */}
             <div className="absolute top-0 left-0 right-0 bg-yellow-100 text-yellow-800 text-xs p-1 text-center border-b border-yellow-200">
                Note: Many websites block embedding via iframes. Wikipedia usually works.
             </div>
        </div>
    </div>
  );
};

export default Browser;
