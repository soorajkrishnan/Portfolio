'use client';

import React from 'react';
import { ArrowUp, Terminal, Activity, Sparkles, Heart } from 'lucide-react';

export default function Footer({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F1419] border-t border-[#D4A853]/20 py-10 px-4 sm:px-6 lg:px-8 text-xs font-mono text-[#8A93A8]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-1 text-center md:text-left">
          <p className="text-[#F5F0E8] font-bold">
            © {new Date().getFullYear()} Sooraj Krishnan V S. All rights reserved.
          </p>
          <p className="text-[11px] text-[#94A3B8]">
            Crafted with Next.js, Tailwind CSS, Three.js &amp; Medallion Precision.
          </p>
        </div>

        {/* Center Live System Status & Easter Egg Trigger */}
        <div className="flex flex-col items-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1F2E] border border-emerald-500/30 text-emerald-400 text-[11px]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>ADX Lakehouse: 2.4M msg/s</span>
          </div>

          <button
            onClick={onOpenTerminal}
            className="text-[11px] text-[#D4A853] hover:underline flex items-center space-x-1"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>&quot;In God we trust. All others must bring data.&quot; — Press Ctrl+K</span>
          </button>
        </div>

        {/* Right Back to Top */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-xl bg-[#1A1F2E] hover:bg-[#2D3447] text-[#E8C878] border border-gray-800 hover:border-[#D4A853] transition-all flex items-center space-x-2 group shadow"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 text-[#D4A853] group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
