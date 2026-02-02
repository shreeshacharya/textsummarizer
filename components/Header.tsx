
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-lg mb-4">
        <i className="fas fa-bolt text-2xl"></i>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Pointify<span className="text-indigo-600">.</span>
      </h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
        Distill any text into clear, short, and actionable points in seconds.
      </p>
    </header>
  );
};

export default Header;
