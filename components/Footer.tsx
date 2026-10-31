'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#0F1419] border-t border-gray-200 dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8 text-xs font-mono text-gray-500 dark:text-[#8A93A8] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Info */}
        <div className="space-y-1 text-center md:text-left">
          <p className="text-[#1A1F2E] dark:text-[#F5F0E8] font-medium">
            © {new Date().getFullYear()} Sooraj Krishnan V S
          </p>
          <p className="text-[11px] text-gray-400 dark:text-[#6B7280]">
            Built with Next.js, Tailwind CSS & canvas
          </p>
        </div>

        {/* Center: static status — Pass 9: no animate-ping */}
        <div className="flex items-center space-x-2 text-[11px] text-emerald-600 dark:text-emerald-500">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Open to opportunities</span>
        </div>

        {/* Right: back to top — Pass 9: no translate on ArrowUp */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-lg bg-gray-100 dark:bg-[#1A1F2E] hover:bg-gray-200 dark:hover:bg-[#2D3447] text-[#B3822A] dark:text-[#D4A853] border border-gray-200 dark:border-gray-800 hover:border-[#B3822A]/40 dark:hover:border-[#D4A853]/40 transition-colors flex items-center space-x-2"
        >
          <span>Back to top</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
