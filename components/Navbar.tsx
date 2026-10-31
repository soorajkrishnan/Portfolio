'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
} from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

export default function Navbar({
  theme,
  onToggleTheme,
  onOpenResume,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { addLog } = useSystemLog();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pass 4: Copy — sentence case, shorter labels
  const navLinks = [
    { label: 'Journey', href: '#journey' },
    { label: 'Case studies', href: '#pipelines' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#1A1F2E]/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand — Pass 7: flat logo mark, no hover scale */}
        <a href="#" className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-[#F1ECE3] dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 text-[#B3822A] dark:text-[#D4A853] font-mono font-bold text-sm">
            {`{ SK }`}
          </div>
          <div>
            {/* Pass 5: sentence case, font-semibold not extrabold */}
            <span className="font-display font-semibold text-base sm:text-lg text-[#1A1F2E] dark:text-[#F5F0E8] tracking-tight block">
              Sooraj Krishnan V S
            </span>
            <span className="font-mono text-[10px] text-[#B3822A] dark:text-[#D4A853] block -mt-0.5">
              Cloud Data Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation — Pass 5: sentence case, Pass 7: cursor-caret signature */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-mono">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => addLog('DATA_ACTION', `Navigated to section: #${link.label}`)}
              className="group text-[#1A1F2E] dark:text-[#94A3B8] hover:text-[#B3822A] dark:hover:text-[#D4A853] transition-colors relative py-1"
            >
              {link.label}
              {/* Signature: terminal caret on hover — only this product would have it */}
              <span className="opacity-0 group-hover:opacity-100 text-[#B3822A] dark:text-[#D4A853] terminal-cursor ml-0.5">
                |
              </span>
            </a>
          ))}
        </nav>

        {/* Action Controls — Pass 9: no scale, transition-colors */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={() => {
              addLog('INFO', `Theme updated to ${theme === 'dark' ? 'Light' : 'Dark'} mode`);
              onToggleTheme();
            }}
            title="Toggle theme"
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#2D3447] dark:hover:bg-[#374158] border border-gray-300 dark:border-gray-700 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#B3822A]" />}
          </button>

          <button
            onClick={() => {
              addLog('AUDIT_LOG', 'Resume Document Inspection Requested', 'Candidate: Sooraj Krishnan V S');
              onOpenResume();
            }}
            className="px-4 py-2 rounded-lg bg-[#D4A853] hover:bg-[#C89940] text-[#1A1F2E] font-mono font-medium text-xs transition-colors flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-[#2D3447] text-[#E8C878] transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#2D3447] text-[#F5F0E8] border border-gray-700 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-[#0F1419] border-b border-gray-200 dark:border-gray-800 px-4 pt-3 pb-6 font-mono text-sm space-y-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#1A1F2E] dark:text-[#94A3B8] hover:text-[#B3822A] dark:hover:text-[#D4A853] py-2 border-b border-gray-100 dark:border-gray-800 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 bg-[#D4A853] hover:bg-[#C89940] text-[#1A1F2E] font-medium rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>View resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
