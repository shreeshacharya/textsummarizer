
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import { summarizeText } from './services/geminiService';
import { SummaryResult, AppStatus } from './types';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = useCallback(async () => {
    if (!text.trim()) return;

    setStatus(AppStatus.LOADING);
    setError(null);
    setResult(null);

    try {
      const summary = await summarizeText(text);
      setResult(summary);
      setStatus(AppStatus.SUCCESS);
      // Smooth scroll to results
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setStatus(AppStatus.ERROR);
    }
  }, [text]);

  const handleReset = () => {
    setText('');
    setResult(null);
    setStatus(AppStatus.IDLE);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Header />
      
      <main className="mt-12 space-y-8">
        <InputSection 
          text={text} 
          setText={setText} 
          onSummarize={handleSummarize} 
          isLoading={status === AppStatus.LOADING}
        />

        {status === AppStatus.ERROR && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-4 animate-in fade-in">
            <i className="fas fa-circle-exclamation text-xl"></i>
            <div>
              <p className="font-bold">Something went wrong</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <OutputSection result={result} />

        {result && (
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleReset}
              className="px-6 py-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2"
            >
              <i className="fas fa-rotate-left"></i>
              Start a new summary
            </button>
          </div>
        )}
      </main>

      <footer className="mt-24 py-8 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Pointify AI. Powered by Gemini 3 Flash.</p>
      </footer>
    </div>
  );
};

export default App;
