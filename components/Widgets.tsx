import React from 'react';
import { Search } from 'lucide-react';

export const Widgets: React.FC = () => {
  return (
    <div className="hidden lg:block w-80 sticky top-0 h-screen p-4 pl-8 border-l border-slate-200">
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search Veritas" 
          className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none placeholder-slate-500"
        />
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <h2 className="font-bold text-xl mb-4 text-slate-900">High Quality Reads</h2>
        <div className="space-y-4">
          <div className="cursor-pointer hover:bg-slate-100 p-2 -mx-2 rounded-lg transition-colors">
            <p className="text-xs text-slate-500">Science · Trending</p>
            <p className="font-semibold text-slate-800">The James Webb Telescope's latest deep field</p>
            <p className="text-xs text-slate-400 mt-1">12.5k posts</p>
          </div>
          <div className="cursor-pointer hover:bg-slate-100 p-2 -mx-2 rounded-lg transition-colors">
            <p className="text-xs text-slate-500">Literature · Classic</p>
            <p className="font-semibold text-slate-800">Why Dostoevsky matters in 2024</p>
            <p className="text-xs text-slate-400 mt-1">8.2k posts</p>
          </div>
          <div className="cursor-pointer hover:bg-slate-100 p-2 -mx-2 rounded-lg transition-colors">
            <p className="text-xs text-slate-500">Technology · AI</p>
            <p className="font-semibold text-slate-800">Ethical considerations in LLM development</p>
            <p className="text-xs text-slate-400 mt-1">15k posts</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-slate-400 leading-relaxed px-2">
        <p>© 2024 Veritas Inc. Quality First. No Spam. Pure Thought.</p>
      </div>
    </div>
  );
};