'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Code,
  Database,
  Cloud,
  Cpu,
  Brain,
  Terminal,
  Check
} from 'lucide-react';

export default function SkillsAndCertifications() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Pass 3: all category icons use the same amber color role
  const skillCategories = [
    {
      title: 'Programming languages',
      icon: <Code className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />,
      skills: [
        { name: 'Python', level: 'Expert', detail: 'FastAPI, PySpark, Pandas, Gensim' },
        { name: 'SQL', level: 'Expert', detail: 'Complex joins, window functions, index tuning' },
        { name: 'KQL', level: 'Advanced', detail: 'Azure Data Explorer, telemetry analytics' },
      ],
    },
    {
      title: 'Data engineering & lakes',
      icon: <Database className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />,
      skills: [
        { name: 'Medallion architecture', level: 'Expert', detail: 'Bronze → Silver → Gold ADX tables' },
        { name: 'Data pipeline development', level: 'Expert', detail: 'Batch & stream processing' },
        { name: 'Azure Data Explorer (ADX)', level: 'Expert', detail: 'Real-time telemetry & materialized views' },
        { name: 'Apache Spark & Databricks', level: 'Advanced', detail: 'Delta Lake & PySpark transformations' },
      ],
    },
    {
      title: 'Cloud platforms (Azure & AWS)',
      icon: <Cloud className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />,
      skills: [
        { name: 'Azure Event Hubs', level: 'Expert', detail: 'High-throughput stream ingestion' },
        { name: 'AWS Step Functions', level: 'Advanced', detail: 'Serverless workflow state machines' },
        { name: 'AWS Textract & A2I', level: 'Advanced', detail: 'OCR layout parsing & human-in-loop' },
        { name: 'Amazon Comprehend', level: 'Advanced', detail: 'NLP entity & sentiment detection' },
      ],
    },
    {
      title: 'DevOps & infrastructure',
      icon: <Cpu className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />,
      skills: [
        { name: 'Terraform & Bicep', level: 'Advanced', detail: 'Infrastructure as Code (IaC)' },
        { name: 'CI/CD & Git', level: 'Expert', detail: 'Automated deployment pipelines' },
        { name: 'Debezium CDC', level: 'Advanced', detail: 'Log-based database event capture' },
        { name: 'PostgreSQL & Redis', level: 'Expert', detail: 'Relational & in-memory caching' },
      ],
    },
    {
      title: 'Machine learning & AI',
      icon: <Brain className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />,
      skills: [
        { name: 'Topic modeling', level: 'Advanced', detail: 'Gensim, SpaCy, LDA semantic clustering' },
        { name: 'Named entity recognition', level: 'Advanced', detail: 'Custom SpaCy pipelines' },
        { name: 'Generative AI', level: 'Practitioner', detail: 'LLM integration & document parsing' },
      ],
    },
    {
      title: 'Frameworks & web parsing',
      icon: <Terminal className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />,
      skills: [
        { name: 'FastAPI & Pydantic', level: 'Expert', detail: 'Dynamic REST API generators' },
        { name: 'Flask', level: 'Advanced', detail: 'Lightweight microservices' },
        { name: 'BeautifulSoup & pdfplumber', level: 'Expert', detail: 'Unstructured document scraping' },
      ],
    },
  ];

  const certifications = [
    {
      id: 'databricks',
      title: 'Databricks Certified Data Engineer Associate',
      issuer: 'Databricks',
      year: '2026',
      description: 'Validates expertise in Delta Lake, Lakehouse architecture, PySpark transformations, structured streaming, and Databricks workflows.',
      verificationId: 'DB-ENG-2026-SOORAJ',
    },
    {
      id: 'aws_ai',
      title: 'AWS Certified AI Practitioner',
      issuer: 'Amazon Web Services',
      year: '2026',
      description: 'Demonstrates deep knowledge of AI/ML services on AWS, Bedrock, Textract, Step Functions, SageMaker, and generative AI applications.',
      verificationId: 'AWS-AIP-2026-SOORAJ',
    },
    {
      id: 'azure_ai',
      title: 'Microsoft Certified: Azure AI Fundamentals',
      issuer: 'Microsoft',
      year: '2024',
      description: 'Validates foundational knowledge of machine learning workloads, Azure Computer Vision, NLP, and Cognitive Services on Microsoft Azure.',
      verificationId: 'MSFT-AI900-2024-SOORAJ',
    },
  ];

  return (
    <section id="skills" className="py-20 bg-[#F1ECE3] dark:bg-[#1A1F2E] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title — Pass 5: font-bold, Pass 4: cleaner copy */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#1A1F2E] dark:text-[#F5F0E8] tracking-tight">
            Skills &amp; <span className="text-[#B3822A] dark:text-[#D4A853]">credentials</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-body">
            Cloud engineering stack and certified achievements.
          </p>
        </div>

        {/* Certifications — Pass 5: sentence case label, Pass 9: no hover lift */}
        <div className="mb-16">
          <h3 className="font-mono text-xs text-[#B3822A] dark:text-[#D4A853] font-medium mb-6 flex items-center">
            <Award className="w-4 h-4 mr-1.5" />
            Verified cloud certifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
                className={`p-6 rounded-xl bg-white dark:bg-[#0F1419] border border-gray-200 dark:border-gray-800 hover:border-[#B3822A]/40 dark:hover:border-[#D4A853]/40 cursor-pointer transition-colors duration-200 shadow-sm relative overflow-hidden ${
                  selectedCert === cert.id ? 'border-[#B3822A] dark:border-[#D4A853]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-700">
                    <Award className="w-5 h-5 text-[#B3822A] dark:text-[#D4A853]" />
                  </div>
                  {/* Pass 7: year as quiet mono text, not glowing pill */}
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-500 tabular-nums">
                    {cert.year}
                  </span>
                </div>

                <h4 className="font-display font-semibold text-base text-[#1A1F2E] dark:text-[#F5F0E8]">
                  {cert.title}
                </h4>
                <p className="text-xs font-mono text-[#B3822A] dark:text-[#D4A853] mt-1">
                  {cert.issuer}
                </p>

                <p className="mt-3 text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                  {cert.description}
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="flex items-center text-emerald-600 dark:text-emerald-500">
                    <Check className="w-3 h-3 mr-1" /> Active
                  </span>
                  <span>{cert.verificationId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Grid — Pass 1: consistent card padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="bg-white dark:bg-[#0F1419] border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-[#B3822A]/30 dark:hover:border-[#D4A853]/30 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-700">
                  {cat.icon}
                </div>
                {/* Pass 5: sentence case titles */}
                <h3 className="font-display font-medium text-base text-[#1A1F2E] dark:text-[#F5F0E8]">
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-2">
                {cat.skills.map((s) => (
                  <div key={s.name} className="p-2.5 rounded-md bg-gray-50 dark:bg-[#1A1F2E]/60 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#1A1F2E] dark:text-[#F5F0E8] font-medium">{s.name}</span>
                      {/* Pass 7: level as quiet mono text */}
                      <span className="text-[#B3822A] dark:text-[#D4A853] text-[10px]">
                        {s.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-500 font-body mt-1">
                      {s.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
