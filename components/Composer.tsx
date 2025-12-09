import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react';
import { analyzeTweetContent } from '../services/geminiService';
import { AnalysisResult, User } from '../types';

interface ComposerProps {
  currentUser: User;
  onPostCreated: (content: string, result: AnalysisResult) => void;
}

export const Composer: React.FC<ComposerProps> = ({ currentUser, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    const result = await analyzeTweetContent(content);
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handlePost = () => {
    if (analysisResult?.approved) {
      onPostCreated(content, analysisResult);
      setContent('');
      setAnalysisResult(null);
    }
  };

  const applyFix = () => {
    if (analysisResult?.improvedVersion) {
      setContent(analysisResult.improvedVersion);
      // We implicitly trust the AI's fix, or we can force re-analysis. 
      // Let's set it as pre-approved but keep the score visible so they know it was fixed.
      setAnalysisResult({
        ...analysisResult,
        approved: true, 
        critique: "Auto-corrected based on AI suggestion."
      });
    }
  };

  return (
    <div className="border-b border-slate-200 p-4 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex gap-4">
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name} 
          className="w-12 h-12 rounded-full object-cover shadow-sm"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => {
                setContent(e.target.value);
                // Reset analysis if user edits significantly
                if (analysisResult) setAnalysisResult(null);
            }}
            placeholder="Share something meaningful..."
            className="w-full resize-none bg-transparent text-lg placeholder-slate-400 focus:outline-none min-h-[100px] text-slate-800"
            maxLength={500}
          />

          {/* AI Analysis Result Card */}
          {analysisResult && (
            <div className={`mt-3 p-4 rounded-xl border flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300
              ${analysisResult.approved 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-rose-50 border-rose-200 text-rose-800'}`
            }>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  {analysisResult.approved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                  )}
                  <span>
                    {analysisResult.approved ? "Quality Verified" : "Quality Check Failed"}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border 
                    ${analysisResult.approved ? "border-emerald-200 bg-emerald-100" : "border-rose-200 bg-rose-100"}`}>
                    Score: {analysisResult.score}/100
                  </span>
                </div>
                <button 
                    onClick={() => setAnalysisResult(null)}
                    className="opacity-50 hover:opacity-100"
                >
                    <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm opacity-90">{analysisResult.critique}</p>

              {!analysisResult.approved && analysisResult.improvedVersion && (
                <div className="mt-2 bg-white/60 p-3 rounded-lg border border-rose-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-1">Suggested Improvement</p>
                  <p className="text-sm text-slate-700 italic">"{analysisResult.improvedVersion}"</p>
                  <button 
                    onClick={applyFix}
                    className="mt-2 flex items-center gap-2 text-xs font-semibold bg-rose-600 text-white px-3 py-1.5 rounded-full hover:bg-rose-700 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Apply Fix
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-400 font-medium">
               {content.length}/500
            </div>

            <div className="flex items-center gap-3">
              {!analysisResult?.approved ? (
                <button
                  onClick={handleAnalyze}
                  disabled={!content.trim() || isAnalyzing}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all shadow-sm
                    ${!content.trim() || isAnalyzing
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 hover:shadow-md active:scale-95'
                    }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Check Quality
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handlePost}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-emerald-200 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};