import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, RotateCw, Search, Folder, File, HardDrive, Monitor, Download, Image, Music, Video } from 'lucide-react';

const Explorer: React.FC = () => {
  const sidebarItems = [
    { icon: Monitor, label: 'Desktop', color: 'text-blue-500' },
    { icon: Download, label: 'Downloads', color: 'text-blue-500' },
    { icon: File, label: 'Documents', color: 'text-yellow-500' },
    { icon: Image, label: 'Pictures', color: 'text-yellow-500' },
    { icon: Music, label: 'Music', color: 'text-pink-500' },
    { icon: Video, label: 'Videos', color: 'text-purple-500' },
  ];

  const drives = [
    { label: 'Windows (C:)', used: '80GB', total: '256GB', percent: 30 },
    { label: 'Data (D:)', used: '120GB', total: '512GB', percent: 23 },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f9f9f9]">
        {/* Toolbar */}
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-3 space-x-2">
            <div className="flex space-x-1 text-gray-400">
                <button className="p-1 hover:bg-gray-100 rounded"><ArrowLeft className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><ArrowRight className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><ArrowUp className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 flex items-center space-x-2 border border-gray-200 rounded-md bg-gray-50 px-2 py-1 text-sm">
                <Monitor className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">This PC</span>
            </div>
            <div className="w-48 flex items-center space-x-2 border border-gray-200 rounded-md bg-gray-50 px-2 py-1 text-sm">
                <Search className="w-3 h-3 text-gray-400" />
                <span className="text-gray-400">Search This PC</span>
            </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 bg-white/50 border-r border-gray-200 p-2 flex flex-col space-y-1 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-500 px-2 mb-2 mt-2">Pinned</div>
                <button className="flex items-center space-x-2 px-2 py-1 bg-blue-100/50 rounded hover:bg-blue-100 text-sm text-gray-700">
                    <Monitor className="w-4 h-4 text-blue-500" />
                    <span>This PC</span>
                </button>
                {sidebarItems.map((item, i) => (
                    <button key={i} className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 text-sm text-gray-700">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 overflow-y-auto bg-white">
                <h2 className="text-sm font-semibold text-gray-600 mb-3">Folders (6)</h2>
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {sidebarItems.map((item, i) => (
                         <div key={i} className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:border-blue-200 border border-transparent rounded cursor-default">
                            <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded">
                                <item.icon className={`w-8 h-8 ${item.color}`} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                                <span className="text-xs text-gray-400">System Folder</span>
                            </div>
                         </div>
                    ))}
                </div>

                <h2 className="text-sm font-semibold text-gray-600 mb-3">Devices and drives (2)</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {drives.map((drive, i) => (
                        <div key={i} className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:border-blue-200 border border-transparent rounded cursor-default">
                            <HardDrive className="w-10 h-10 text-gray-600" />
                            <div className="flex-1">
                                <div className="text-sm text-gray-700 font-medium mb-1">{drive.label}</div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                                    <div className="h-full bg-blue-500" style={{ width: `${drive.percent}%` }}></div>
                                </div>
                                <div className="text-xs text-gray-500">{drive.used} free of {drive.total}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Explorer;
