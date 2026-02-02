
import React from 'react';

interface InputSectionProps {
  text: string;
  setText: (text: string) => void;
  onSummarize: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ text, setText, onSummarize, isLoading }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="p-6">
        <label htmlFor="text-input" className="block text-sm font-semibold text-slate-700 mb-2">
          Paste your content here
        </label>
        <textarea
          id="text-input"
          className="w-full h-64 p-4 text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all placeholder:text-slate-400"
          placeholder="Enter news articles, long emails, or research papers..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500 italic">
            {text.length > 0 ? `${text.trim().split(/\s+/).length} words` : 'Empty input'}
          </div>
          <button
            onClick={onSummarize}
            disabled={isLoading || !text.trim()}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              isLoading || !text.trim()
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {isLoading ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                Processing...
              </>
            ) : (
              <>
                <i className="fas fa-wand-magic-sparkles"></i>
                Summarize Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
