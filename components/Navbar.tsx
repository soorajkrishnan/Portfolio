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

  const navLinks = [
    { label: 'JOURNEY', href: '#journey' },
    { label: 'CASE STUDIES', href: '#pipelines' },
    { label: 'SKILLS & CERTIFICATIONS', href: '#skills' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#1A1F2E]/90 backdrop-blur-xl border-b border-gray-200 dark:border-[#D4A853]/20 shadow-xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-2.5 group">
          <div className="p-2 rounded-xl bg-[#F1ECE3] dark:bg-[#0F1419] border border-gray-300 dark:border-[#D4A853]/40 text-[#B3822A] dark:text-[#D4A853] font-mono font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            {`{ SK }`}
          </div>
          <div>
            <span className="font-display font-extrabold text-base sm:text-lg text-[#1A1F2E] dark:text-[#F5F0E8] tracking-wider block">
              SOORAJ KRISHNAN V S
            </span>
            <span className="font-mono text-[10px] text-[#B3822A] dark:text-[#D4A853] uppercase tracking-widest block -mt-1 font-semibold">
              Cloud Data Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono tracking-wider font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => addLog('DATA_ACTION', `Navigated to section: #${link.label}`)}
              className="text-[#1A1F2E] dark:text-[#F5F0E8] hover:text-[#B3822A] dark:hover:text-[#D4A853] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B3822A] dark:after:bg-[#D4A853] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls (Dark Mode, Resume) */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={() => {
              addLog('INFO', `Theme updated to ${theme === 'dark' ? 'Light' : 'Dark'} mode`);
              onToggleTheme();
            }}
            title="Toggle Dark / Light Theme"
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#2D3447] dark:hover:bg-gray-700 text-amber-600 dark:text-[#E8C878] border border-gray-300 dark:border-gray-700 transition-all shadow"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Resume Trigger */}
          <button
            onClick={() => {
              addLog('AUDIT_LOG', 'Resume Document Inspection Requested', 'Candidate: Sooraj Krishnan V S');
              onOpenResume();
            }}
            className="px-4 py-2 rounded-xl bg-[#D4A853] hover:bg-[#E8C878] text-[#1A1F2E] font-mono font-bold text-xs shadow transition-all hover:scale-105 flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-[#2D3447] text-[#E8C878]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#2D3447] text-[#F5F0E8] border border-gray-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#0F1419] border-b border-gray-200 dark:border-[#D4A853]/30 px-4 pt-3 pb-6 font-mono text-sm space-y-3 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#1A1F2E] dark:text-[#F5F0E8] hover:text-[#B3822A] dark:hover:text-[#D4A853] py-2 border-b border-gray-200 dark:border-gray-800"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 bg-[#D4A853] text-[#1A1F2E] font-bold rounded-lg flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>View &amp; Download Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
