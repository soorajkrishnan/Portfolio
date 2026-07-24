'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Database, Zap, FileText, Award } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: <Database className="w-5 h-5 text-[#D4A853]" />,
      value: '4+ Years',
      label: 'Cloud Data Engineering',
      sub: 'TCS & Enterprise Pipelines',
    },
    {
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      value: '60% Cut',
      label: 'FastAPI Dev Time',
      sub: 'Dynamic Generator Framework',
    },
    {
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      value: '80%+',
      label: 'AWS Document Precision',
      sub: 'Textract + A2I + Comprehend',
    },
    {
      icon: <Award className="w-5 h-5 text-purple-400" />,
      value: '3 Cloud Certs',
      label: 'Databricks, AWS & Azure',
      sub: 'Verified Associate Credentials',
    },
  ];

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 -mt-10 sm:-mt-14 mb-12">
      <div className="bg-white dark:bg-[#2D3447]/90 backdrop-blur-xl border border-gray-200 dark:border-[#D4A853]/30 rounded-2xl shadow-xl dark:shadow-2xl p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-700/50">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`flex items-start space-x-3 sm:space-x-4 ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-4 lg:pl-6' : ''}`}
          >
            <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-700/60 shrink-0">
              {stat.icon}
            </div>
            <div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-[#1A1F2E] dark:text-[#F5F0E8]">
                {stat.value}
              </div>
              <div className="font-display font-semibold text-xs sm:text-sm text-[#B3822A] dark:text-[#D4A853]">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-gray-600 dark:text-gray-400 mt-0.5 font-normal">
                {stat.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
