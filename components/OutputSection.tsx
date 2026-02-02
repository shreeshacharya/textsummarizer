
import React from 'react';
import { SummaryResult } from '../types';

interface OutputSectionProps {
  result: SummaryResult | null;
}

const OutputSection: React.FC<OutputSectionProps> = ({ result }) => {
  if (!result) return null;

  const copyToClipboard = () => {
    const text = result.points.map(p => `• ${p}`).join('\n');
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <i className="fas fa-check text-sm"></i>
            </span>
            Key Points
          </h2>
          <button 
            onClick={copyToClipboard}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            <i className="far fa-copy"></i>
            Copy All
          </button>
        </div>

        <ul className="space-y-4">
          {result.points.map((point, index) => (
            <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:border-indigo-100 hover:shadow-md">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-indigo-600 text-white rounded-full text-xs font-bold mt-0.5">
                {index + 1}
              </span>
              <p className="text-slate-700 leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-lg text-center">
            <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Original Length</span>
            <span className="text-lg font-bold text-slate-900">{result.originalWordCount} words</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg text-center">
            <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Reduction</span>
            <span className="text-lg font-bold text-indigo-600">
              {Math.round((1 - result.summaryWordCount / result.originalWordCount) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputSection;
