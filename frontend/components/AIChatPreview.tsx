'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  Lock,
  Plus,
  Bot,
  User,
  CheckCircle,
  Lightbulb
} from 'lucide-react';
import { INITIAL_CHAT_MESSAGES } from '../data/mockData';
import { ChatMessage } from '../types';

export const AIChatPreview: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [activePresetBadge, setActivePresetBadge] = useState<string>('Warm Scandinavian + Preserved Bookshelf');

  // Handle clicking quick action chips
  const handleAddPrompt = (promptText: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      text: promptText,
    };

    let replyText = `Applied: "${promptText}". The spatial model updated material definitions and lighting properties accordingly.`;
    if (promptText.includes('Sofa')) {
      replyText = "Selected a low-profile Bouclé Minimalist sofa fitting the existing 2.4m seating zone clearance.";
      setActivePresetBadge('Bouclé Seating + Warm Ambience');
    } else if (promptText.includes('Lighting')) {
      replyText = "Updated room illumination to 3200K warm incandescent ambient tone.";
      setActivePresetBadge('3200K Ambient Lighting Mode');
    } else if (promptText.includes('Oak')) {
      replyText = "Synthesized continuous French Oak flooring with 45° herringbone pattern.";
      setActivePresetBadge('Oak Herringbone Flooring Active');
    } else if (promptText.includes('Plants')) {
      replyText = "Positioned architectural Olive tree in ceramic planter beside south window light source.";
      setActivePresetBadge('Architectural Botanicals Added');
    }

    const aiReply: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      timestamp: 'Just now',
      text: replyText,
    };

    setMessages((prev) => [...prev, userMsg, aiReply]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleAddPrompt(inputText);
    setInputText('');
  };

  return (
    <section id="ai-assistant" className="py-24 md:py-32 bg-[#FAF8F5] relative border-t border-[#DED8CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E9] border border-[#DED8CB] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C27453]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
              Interactive Concept Demo
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tight text-[#181716] leading-tight">
            Conversational Spatial Editing with{' '}
            <span className="font-serif italic font-normal text-[#C27453]">AI Assistant.</span>
          </h2>
          <p className="text-base text-[#57534E] mt-3 font-light max-w-xl">
            Describe adjustments in natural language. The AI assistant updates finishes, lighting, and furniture while preserving your chosen architectural landmarks.
          </p>
        </div>

        {/* Split Screen: Room Preview on Left & Chat Interface on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Room Preview */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/11] bg-[#181716] border border-[#DED8CB] shadow-md flex-1">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85"
                alt="AI Redesigned Room based on natural language commands"
                className="w-full h-full object-cover"
              />

              {/* Status Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <div className="bg-[#181716]/85 backdrop-blur-md text-[#FCFBF9] text-xs font-medium px-3 py-1.5 rounded-full border border-white/15 shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{activePresetBadge}</span>
                </div>
              </div>

              {/* Preserved Landmark Tags */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="bg-[#181716]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[#FCFBF9] text-xs flex items-center gap-2">
                  <Lock className="w-3 h-3 text-[#C27453]" />
                  <span className="font-mono text-[11px] text-[#E9E4DA]">Locked: Built-in Bookshelf</span>
                </div>

                <span className="hidden sm:block text-[10px] font-mono bg-[#181716]/80 text-[#A8A29E] px-2.5 py-1 rounded-full border border-white/10">
                  Concept Demonstration
                </span>
              </div>
            </div>

            {/* Subtext info */}
            <div className="mt-3 flex items-center justify-between text-xs text-[#78716C] px-1">
              <span>Interactive preview • Ready for FastAPI & LLM integration</span>
              <span className="font-mono text-[11px]">Model: Spatial Inpainting</span>
            </div>
          </div>

          {/* Right Column: Conversational Assistant Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#FCFBF9] rounded-3xl border border-[#DED8CB] p-6 shadow-sm">
            {/* Chat Header */}
            <div className="pb-4 border-b border-[#DED8CB]/70 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#181716] text-[#FCFBF9] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#C27453]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#181716]">Forma Design Assistant</h3>
                  <p className="text-[11px] text-[#78716C] font-mono">Product Preview Demo</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-[#F5F1E9] text-[#57534E] px-2.5 py-1 rounded-full border border-[#DED8CB]">
                Concept UI
              </span>
            </div>

            {/* Chat Message Stream */}
            <div className="py-4 space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-[#181716] text-[#FCFBF9] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      <Bot className="w-3.5 h-3.5 text-[#C27453]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#181716] text-[#FCFBF9] rounded-tr-xs'
                        : 'bg-[#F5F1E9] text-[#181716] border border-[#DED8CB]/70 rounded-tl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1 font-mono ${
                        msg.sender === 'user' ? 'text-white/60 text-right' : 'text-[#78716C]'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-[#EAE5DC] text-[#181716] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      <User className="w-3.5 h-3.5 text-[#57534E]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Suggested Quick Prompt Action Chips */}
            <div className="pt-3 border-t border-[#DED8CB]/60">
              <span className="text-[11px] font-mono text-[#78716C] uppercase tracking-wider block mb-2">
                Suggested Actions (Click to Test):
              </span>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {[
                  '+ Replace Sofa',
                  '+ Warm Lighting',
                  '+ Oak Flooring',
                  '+ Add Plants',
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleAddPrompt(chip)}
                    className="text-[11px] font-medium bg-[#F5F1E9] hover:bg-[#EAE5DC] text-[#181716] border border-[#DED8CB] px-2.5 py-1 rounded-full transition-colors active:scale-95 flex items-center gap-1"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Chat Input Box */}
              <form onSubmit={handleFormSubmit} className="relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g. Make lighting warmer, add a wool rug..."
                  className="w-full bg-[#FAF8F5] border border-[#DED8CB] rounded-full px-4 py-2.5 pr-10 text-xs text-[#181716] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C27453]"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#181716] text-[#FCFBF9] flex items-center justify-center hover:bg-[#2A2725] transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
