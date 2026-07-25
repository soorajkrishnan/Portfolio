'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#0F1419] border-t border-gray-200 dark:border-[#D4A853]/20 py-10 px-4 sm:px-6 lg:px-8 text-xs font-mono text-gray-600 dark:text-[#8A93A8] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-1 text-center md:text-left">
          <p className="text-[#1A1F2E] dark:text-[#F5F0E8] font-bold">
            © {new Date().getFullYear()} Sooraj Krishnan V S. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-500 dark:text-[#94A3B8]">
            Crafted with Next.js, Tailwind CSS, WebGL Canvas &amp; Medallion Precision.
          </p>
        </div>

        {/* Center Live System Status */}
        <div className="flex flex-col items-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-[#1A1F2E] border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[11px]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Telemetry Active</span>
          </div>
        </div>

        {/* Right Back to Top */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-xl bg-gray-100 dark:bg-[#1A1F2E] hover:bg-gray-200 dark:hover:bg-[#2D3447] text-[#B3822A] dark:text-[#E8C878] border border-gray-200 dark:border-gray-800 hover:border-[#B3822A] dark:hover:border-[#D4A853] transition-all flex items-center space-x-2 group shadow-sm dark:shadow"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 text-[#B3822A] dark:text-[#D4A853] group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
