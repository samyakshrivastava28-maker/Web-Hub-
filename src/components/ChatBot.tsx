import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Zap, BrainCircuit, Globe, Sparkles } from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (e) {
  console.warn("Failed to initialize GoogleGenAI:", e);
}

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

type AiMode = 'general' | 'search' | 'thinking' | 'fast';

const SYSTEM_INSTRUCTION = "You are a helpful customer support assistant for S-Web Hub, a web development agency in India. You build affordable, fast, and modern websites for small businesses. Prices: Starter (₹2499), Growth (₹4999), Premium (₹9999). Contact: WhatsApp +918305500767, Email webhub2811@gmail.com. Be concise, friendly, and helpful. Keep responses relatively short and conversational.";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hi there! I am the S-Web Hub assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AiMode>('general');
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const modeConfigs: Record<AiMode, { name: string, icon: any, desc: string }> = {
    general: { name: 'Gemini Intelligence', icon: Sparkles, desc: 'Balanced intelligence using Flash' },
    search: { name: 'Google Search Data', icon: Globe, desc: 'Real-time ground info using Search' },
    thinking: { name: 'High Thinking', icon: BrainCircuit, desc: 'Deep reasoning using Pro' },
    fast: { name: 'Low Latency', icon: Zap, desc: 'Ultra-fast responses using Lite' }
  };

  const initializeChat = (selectedMode: AiMode) => {
    if (!ai) return;
    
    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
    };
    let modelName = "gemini-3-flash-preview";

    if (selectedMode === 'search') {
      config.tools = [{ googleSearch: {} }];
    } else if (selectedMode === 'thinking') {
      modelName = "gemini-3.1-pro-preview";
      config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
    } else if (selectedMode === 'fast') {
      modelName = "gemini-3.1-flash-lite-preview";
    }

    chatRef.current = ai.chats.create({
      model: modelName,
      config: config
    });
  };

  useEffect(() => {
    initializeChat(mode);
  }, []);

  const handleModeChange = (newMode: AiMode) => {
    setMode(newMode);
    initializeChat(newMode);
    // Add a system boundary message
    setMessages(prev => [...prev, { id: Date.now().toString(), text: `Switched to ${modeConfigs[newMode].name} mode.`, sender: 'bot' }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user' }]);
    
    if (!ai || !chatRef.current) {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "Chat is currently unavailable (missing API key). Please contact us on WhatsApp.", sender: 'bot' }]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { id: Date.now().toString(), text: response.text, sender: 'bot' }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "Sorry, I'm having trouble connecting right now. Please try again later or contact us on WhatsApp.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-14 px-5 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
        <span className="font-semibold text-sm whitespace-nowrap">Ask Web Assistant</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] sm:w-[350px] h-[500px] max-h-[75vh] bg-white rounded-2xl shadow-2xl flex flex-col z-[100] overflow-hidden border border-slate-200">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md z-10">
            <div>
              <h3 className="font-bold flex items-center gap-2">S-Web Hub Assistant</h3>
              <p className="text-blue-100 text-xs mt-1">Online</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition-colors p-1">
              <X size={24} />
            </button>
          </div>
          
          {/* Mode Selector */}
          <div className="bg-slate-100 p-2 border-b border-slate-200 grid grid-cols-4 gap-1.5 z-10 shrink-0">
            {(Object.keys(modeConfigs) as AiMode[]).map((m) => {
              const MIcon = modeConfigs[m].icon;
              return (
                <button
                  key={m}
                  onClick={() => handleModeChange(m)}
                  title={modeConfigs[m].desc}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-lg border text-xs transition-colors ${mode === m ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                  <MIcon size={16} className="mb-0.5" />
                  <span className="text-[10px] whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                    {m === 'general' ? 'Gemini' : m === 'thinking' ? 'Pro Think' : m === 'search' ? 'Search' : 'Fast'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative bg-slate-50">
            {showTutorial && (
              <div className="absolute inset-0 z-20 bg-slate-50/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 w-full">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Power of Gemini</h4>
                  <p className="text-sm text-slate-600 mb-4 text-left">
                    Use the buttons above to toggle different Gemini models:
                  </p>
                  <ul className="text-xs text-slate-600 mb-6 text-left space-y-2">
                    <li className="flex items-center gap-2"><Sparkles size={14} className="text-blue-500" /> <b>Gemini</b> - Standard intelligence</li>
                    <li className="flex items-center gap-2"><Globe size={14} className="text-blue-500" /> <b>Search</b> - Real-time Google info</li>
                    <li className="flex items-center gap-2"><BrainCircuit size={14} className="text-blue-500" /> <b>Thinking</b> - Complex reasoning</li>
                    <li className="flex items-center gap-2"><Zap size={14} className="text-blue-500" /> <b>Fast</b> - Low-latency mode</li>
                  </ul>
                  <button 
                    onClick={() => setShowTutorial(false)}
                    className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Got it, let's chat!
                  </button>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm flex flex-col'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-2 items-center text-sm text-slate-500">
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                  {mode === 'search' && "Searching web..."}
                  {mode === 'thinking' && "Thinking deeply..."}
                  {mode === 'fast' && "Quickly generating..."}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full px-4 py-2 text-sm outline-none transition-all"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors flex-shrink-0"
              >
                <Send size={16} className="ml-1" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
