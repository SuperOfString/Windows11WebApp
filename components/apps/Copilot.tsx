import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getChatResponseStream } from '../../services/geminiService';
import { Message } from '../../types';

const Copilot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi there! I\'m your Windows Copilot. How can I help you today?' }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsStreaming(true);

    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
        const stream = getChatResponseStream(userMessage);
        
        for await (const chunk of stream) {
            setMessages(prev => {
                const newHistory = [...prev];
                const lastMsg = newHistory[newHistory.length - 1];
                if (lastMsg.role === 'model') {
                    lastMsg.text += chunk;
                }
                return newHistory;
            });
        }
    } catch (err) {
        setMessages(prev => [...prev, { role: 'model', text: 'Sorry, something went wrong. Please check your API Key.' }]);
    } finally {
        setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3]">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-cyan-500" />
            <h2 className="font-semibold text-gray-800">Copilot</h2>
            <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-1.5 py-0.5 rounded">PREVIEW</span>
        </div>
        <button onClick={() => setMessages([{ role: 'model', text: 'Hi there! I\'m your Windows Copilot. How can I help you today?' }])} className="p-2 hover:bg-gray-100 rounded-full" title="New Topic">
            <RefreshCw className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-cyan-100'}`}>
                        {msg.role === 'user' ? <User className="w-5 h-5 text-gray-600" /> : <Bot className="w-5 h-5 text-cyan-600" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    }`}>
                        <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
                            {msg.text}
                        </ReactMarkdown>
                         {msg.role === 'model' && idx === messages.length - 1 && isStreaming && (
                             <span className="inline-block w-1.5 h-4 bg-cyan-500 ml-1 animate-pulse align-middle"/>
                         )}
                    </div>
                </div>
            </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSend} className="relative">
            <input 
                type="text" 
                className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-inner"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isStreaming}
            />
            <button 
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="absolute right-2 top-2 p-1.5 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Send className="w-4 h-4" />
            </button>
        </form>
        <div className="text-center mt-2 text-[10px] text-gray-400">
            Copilot can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
};

export default Copilot;
