import React, { useState, useRef } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Save, FileText } from 'lucide-react';

const Word: React.FC = () => {
  const [content, setContent] = useState('<h1>Document 1</h1><p>Start typing here...</p>');
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3]">
      {/* Ribbon */}
      <div className="bg-white border-b border-gray-200 p-2 flex space-x-4 shadow-sm z-10">
        <div className="bg-blue-600 text-white p-2 rounded-md shadow-sm">
            <FileText className="w-5 h-5" />
        </div>
        <div className="h-8 w-px bg-gray-300 mx-2 self-center" />
        <div className="flex space-x-1">
            <button onClick={() => execCmd('bold')} className="p-2 hover:bg-gray-100 rounded"><Bold className="w-4 h-4 text-gray-700" /></button>
            <button onClick={() => execCmd('italic')} className="p-2 hover:bg-gray-100 rounded"><Italic className="w-4 h-4 text-gray-700" /></button>
            <button onClick={() => execCmd('underline')} className="p-2 hover:bg-gray-100 rounded"><Underline className="w-4 h-4 text-gray-700" /></button>
        </div>
        <div className="h-8 w-px bg-gray-300 mx-2 self-center" />
        <div className="flex space-x-1">
            <button onClick={() => execCmd('justifyLeft')} className="p-2 hover:bg-gray-100 rounded"><AlignLeft className="w-4 h-4 text-gray-700" /></button>
            <button onClick={() => execCmd('justifyCenter')} className="p-2 hover:bg-gray-100 rounded"><AlignCenter className="w-4 h-4 text-gray-700" /></button>
            <button onClick={() => execCmd('justifyRight')} className="p-2 hover:bg-gray-100 rounded"><AlignRight className="w-4 h-4 text-gray-700" /></button>
        </div>
        <div className="flex-1" />
        <button onClick={() => alert('Document Saved!')} className="p-2 hover:bg-blue-50 text-blue-600 rounded flex items-center space-x-1">
            <Save className="w-4 h-4" />
            <span className="text-xs font-semibold">Save</span>
        </button>
      </div>

      {/* Document Area */}
      <div className="flex-1 overflow-auto p-8 bg-gray-100 flex justify-center">
        <div 
            className="w-[816px] min-h-[1056px] bg-white shadow-xl p-12 outline-none text-gray-800"
            contentEditable
            suppressContentEditableWarning
            ref={editorRef}
            dangerouslySetInnerHTML={{ __html: content }}
            onBlur={(e) => setContent(e.currentTarget.innerHTML)}
        />
      </div>
      
      <div className="h-6 bg-blue-600 text-white text-xs flex items-center px-2 justify-between select-none">
        <div className="flex space-x-4">
            <span>Page 1 of 1</span>
            <span>120 words</span>
        </div>
        <div className="flex space-x-2">
            <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default Word;
