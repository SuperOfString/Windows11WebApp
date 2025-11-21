import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Save, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  ChevronDown,
  Search
} from 'lucide-react';

const COLS = 26;
const ROWS = 40;

const Excel: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<string | null>('A1');
  const [data, setData] = useState<Record<string, string>>({});

  const getColLabel = (index: number) => String.fromCharCode(65 + index);

  const handleCellChange = (cell: string, value: string) => {
    setData(prev => ({ ...prev, [cell]: value }));
  };

  return (
    <div className="flex flex-col h-full bg-white text-xs">
      {/* Green Header */}
      <div className="bg-[#1D6F42] h-10 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center space-x-4">
              <div className="p-1.5 bg-white/10 rounded hover:bg-white/20 cursor-pointer transition-colors">
                  <FileSpreadsheet className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium">Book1 - Excel</span>
          </div>
          
          <div className="bg-[#155633] flex items-center px-2 py-1 rounded w-64">
            <Search className="w-3 h-3 text-white/70 mr-2" />
            <input className="bg-transparent border-none outline-none text-white placeholder-white/70 w-full" placeholder="Search" />
          </div>

          <div className="flex items-center space-x-2">
             <div className="text-white font-medium px-2 py-1 hover:bg-white/10 rounded cursor-pointer">User Name</div>
          </div>
      </div>

      {/* Ribbon */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center space-x-2 shrink-0 overflow-x-auto">
        <div className="flex flex-col items-center px-2 cursor-pointer group">
           <div className="p-1 group-hover:bg-gray-200 rounded"><Save className="w-4 h-4 text-gray-600" /></div>
           <span className="text-[10px] text-gray-500 mt-0.5">Save</span>
        </div>
        <div className="w-px h-8 bg-gray-300 mx-1" />
        <div className="flex items-center space-x-1">
             <button className="p-1.5 hover:bg-gray-200 rounded"><Bold className="w-3 h-3 text-gray-700" /></button>
             <button className="p-1.5 hover:bg-gray-200 rounded"><Italic className="w-3 h-3 text-gray-700" /></button>
             <button className="p-1.5 hover:bg-gray-200 rounded"><Underline className="w-3 h-3 text-gray-700" /></button>
        </div>
        <div className="w-px h-8 bg-gray-300 mx-1" />
        <div className="flex items-center space-x-1">
             <button className="p-1.5 hover:bg-gray-200 rounded"><AlignLeft className="w-3 h-3 text-gray-700" /></button>
             <button className="p-1.5 hover:bg-gray-200 rounded"><AlignCenter className="w-3 h-3 text-gray-700" /></button>
             <button className="p-1.5 hover:bg-gray-200 rounded"><AlignRight className="w-3 h-3 text-gray-700" /></button>
        </div>
        <div className="w-px h-8 bg-gray-300 mx-1" />
        <div className="flex items-center px-2 border border-gray-300 rounded bg-white h-7">
             <span className="mr-2">General</span>
             <ChevronDown className="w-3 h-3 text-gray-500" />
        </div>
      </div>

      {/* Formula Bar */}
      <div className="flex items-center space-x-2 p-2 border-b border-gray-200 bg-white shrink-0">
          <div className="w-10 px-2 py-1 border border-gray-300 bg-white text-center font-medium text-gray-700 truncate">
              {selectedCell || ''}
          </div>
          <div className="text-gray-400">fx</div>
          <input 
            className="flex-1 px-2 py-1 border border-gray-300 focus:outline-none focus:border-[#1D6F42]"
            value={selectedCell ? (data[selectedCell] || '') : ''}
            onChange={(e) => selectedCell && handleCellChange(selectedCell, e.target.value)}
          />
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto relative bg-gray-100">
         {/* Column Headers */}
         <div className="flex sticky top-0 z-10">
             <div className="w-10 h-6 bg-gray-200 border-r border-b border-gray-300 shrink-0"></div>
             {Array.from({ length: COLS }).map((_, i) => (
                 <div key={i} className="w-24 h-6 bg-gray-200 border-r border-b border-gray-300 flex items-center justify-center font-semibold text-gray-600 shrink-0">
                     {getColLabel(i)}
                 </div>
             ))}
         </div>

         {/* Rows */}
         {Array.from({ length: ROWS }).map((_, row) => (
             <div key={row} className="flex">
                 {/* Row Header */}
                 <div className="w-10 h-6 bg-gray-200 border-r border-b border-gray-300 flex items-center justify-center font-semibold text-gray-600 shrink-0 sticky left-0 z-5">
                     {row + 1}
                 </div>
                 {/* Cells */}
                 {Array.from({ length: COLS }).map((_, col) => {
                     const cellId = `${getColLabel(col)}${row + 1}`;
                     const isSelected = selectedCell === cellId;
                     return (
                         <div 
                            key={cellId} 
                            className={`w-24 h-6 border-r border-b border-gray-300 bg-white shrink-0 flex items-center px-1 cursor-cell ${isSelected ? 'border-2 border-[#1D6F42] z-10' : ''}`}
                            onClick={() => setSelectedCell(cellId)}
                         >
                             {isSelected ? (
                                 <input 
                                    className="w-full h-full border-none outline-none bg-transparent"
                                    value={data[cellId] || ''}
                                    onChange={(e) => handleCellChange(cellId, e.target.value)}
                                    autoFocus
                                 />
                             ) : (
                                 <span className="truncate w-full select-none">{data[cellId]}</span>
                             )}
                         </div>
                     );
                 })}
             </div>
         ))}
      </div>

      {/* Bottom Sheet Tabs */}
      <div className="h-8 bg-gray-200 border-t border-gray-300 flex items-center px-2 space-x-1 shrink-0">
          <button className="px-3 py-1 bg-white text-[#1D6F42] font-medium rounded-t shadow-sm text-[11px]">Sheet1</button>
          <button className="p-1 hover:bg-gray-300 rounded-full">
              <div className="w-4 h-4 flex items-center justify-center rounded-full border border-gray-500 text-gray-600 text-xs font-bold">+</div>
          </button>
      </div>
    </div>
  );
};

export default Excel;