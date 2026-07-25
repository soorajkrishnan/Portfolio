'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DataStreamHero from '@/components/DataStreamHero';
import StatsBar from '@/components/StatsBar';
import JourneyWalkthrough from '@/components/JourneyWalkthrough';
import PipelineCaseStudies from '@/components/PipelineCaseStudies';
import SkillsAndCertifications from '@/components/SkillsAndCertifications';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ResumeModal from '@/components/ResumeModal';
import { SystemLogProvider } from '@/context/SystemLogContext';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToJourney = () => {
    const el = document.getElementById('journey');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SystemLogProvider>
      <div className={`min-h-screen font-body selection:bg-[#D4A853] selection:text-[#1A1F2E] transition-colors duration-400 ${theme === 'dark' ? 'bg-[#1A1F2E] text-[#F5F0E8]' : 'bg-[#F8F6F0] text-[#1A1F2E]'}`}>
        {/* Top Fixed Navigation Bar */}
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Main Content Area */}
        <main className="relative z-10">
          {/* Interactive WebGL Hero Canvas */}
          <DataStreamHero
            onWalkJourney={scrollToJourney}
            onOpenResume={() => setResumeOpen(true)}
          />

          {/* Floating Impact Stats Bar */}
          <StatsBar />

          {/* Walk Sooraj's Journey Timeline */}
          <JourneyWalkthrough />

          {/* Detailed Pipeline Case Studies */}
          <PipelineCaseStudies />

          {/* Technical Capability Inventory & Verified Certifications */}
          <SkillsAndCertifications />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* View / Print Full Resume Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    </SystemLogProvider>
  );
}
