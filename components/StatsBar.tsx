'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Database, Zap, FileText, Award } from 'lucide-react';

export default function StatsBar() {
  // Pass 3: all icons same color role (amber accent)
  const stats = [
    {
      icon: <Database className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />,
      value: '4+ years',
      label: 'Cloud data engineering',
      sub: 'TCS & enterprise pipelines',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />,
      value: '60% cut',
      label: 'FastAPI dev time',
      sub: 'Dynamic generator framework',
    },
    {
      icon: <FileText className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />,
      value: '80%+',
      label: 'AWS document precision',
      sub: 'Textract + A2I + Comprehend',
    },
    {
      icon: <Award className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />,
      value: '3 certs',
      label: 'Databricks, AWS & Azure',
      sub: 'Verified associate credentials',
    },
  ];

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 -mt-10 sm:-mt-14 mb-12">
      {/* Pass 1: consistent padding, Pass 2: no colored shadow */}
      <div className="bg-white dark:bg-[#2D3447]/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-700/50">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`flex items-start space-x-3 sm:space-x-4 ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-4 lg:pl-6' : ''}`}
          >
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-700 shrink-0">
              {stat.icon}
            </div>
            <div>
              {/* Pass 5: font-bold (not extrabold), tabular figures */}
              <div className="font-display font-bold text-2xl sm:text-3xl text-[#1A1F2E] dark:text-[#F5F0E8] tabular-nums">
                {stat.value}
              </div>
              <div className="font-display font-medium text-xs sm:text-sm text-[#B3822A] dark:text-[#D4A853]">
                {stat.label}
              </div>
              <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-0.5">
                {stat.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
