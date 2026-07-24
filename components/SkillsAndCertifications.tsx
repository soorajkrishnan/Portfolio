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
  ExternalLink,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function SkillsAndCertifications() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code className="w-5 h-5 text-amber-400" />,
      skills: [
        { name: 'Python', level: 'Expert', detail: 'FastAPI, PySpark, Pandas, Gensim' },
        { name: 'SQL', level: 'Expert', detail: 'Complex Joins, Window Functions, Index Tuning' },
        { name: 'KQL', level: 'Advanced', detail: 'Azure Data Explorer, Telemetry Analytics' },
      ],
    },
    {
      title: 'Data Engineering & Lakes',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      skills: [
        { name: 'Medallion Architecture', level: 'Expert', detail: 'Bronze -> Silver -> Gold ADX Tables' },
        { name: 'Data Pipeline Development', level: 'Expert', detail: 'Batch & Stream Processing' },
        { name: 'Azure Data Explorer (ADX)', level: 'Expert', detail: 'Real-time telemetry & Materialized Views' },
        { name: 'Apache Spark & Databricks', level: 'Advanced', detail: 'Delta Lake & PySpark transformations' },
      ],
    },
    {
      title: 'Cloud Platforms (Azure & AWS)',
      icon: <Cloud className="w-5 h-5 text-sky-400" />,
      skills: [
        { name: 'Azure Event Hubs', level: 'Expert', detail: 'High-throughput stream ingestion' },
        { name: 'AWS Step Functions', level: 'Advanced', detail: 'Serverless workflow state machines' },
        { name: 'AWS Textract & A2I', level: 'Advanced', detail: 'OCR layout parsing & human-in-loop' },
        { name: 'Amazon Comprehend', level: 'Advanced', detail: 'NLP entity & sentiment detection' },
      ],
    },
    {
      title: 'DevOps & Infrastructure',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      skills: [
        { name: 'Terraform & Bicep', level: 'Advanced', detail: 'Infrastructure as Code (IaC)' },
        { name: 'CI/CD & Git', level: 'Expert', detail: 'Automated deployment pipelines' },
        { name: 'Debezium CDC', level: 'Advanced', detail: 'Log-based database event capture' },
        { name: 'PostgreSQL & Redis', level: 'Expert', detail: 'Relational & In-memory caching' },
      ],
    },
    {
      title: 'Machine Learning & AI',
      icon: <Brain className="w-5 h-5 text-rose-400" />,
      skills: [
        { name: 'Topic Modeling', level: 'Advanced', detail: 'Gensim, SpaCy, LDA semantic clustering' },
        { name: 'Named Entity Recognition', level: 'Advanced', detail: 'Custom SpaCy pipelines' },
        { name: 'Generative AI', level: 'Practitioner', detail: 'LLM integration & document parsing' },
      ],
    },
    {
      title: 'Frameworks & Web Parsing',
      icon: <Terminal className="w-5 h-5 text-yellow-400" />,
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
      badgeColor: 'border-[#D4A853] text-[#D4A853] bg-amber-950/40',
      description: 'Validates expertise in Delta Lake, Lakehouse architecture, PySpark transformations, structured streaming, and Databricks workflows.',
      verificationId: 'DB-ENG-2026-SOORAJ',
    },
    {
      id: 'aws_ai',
      title: 'AWS Certified AI Practitioner',
      issuer: 'Amazon Web Services',
      year: '2026',
      badgeColor: 'border-purple-500 text-purple-300 bg-purple-950/40',
      description: 'Demonstrates deep knowledge of AI/ML services on AWS, Bedrock, Textract, Step Functions, SageMaker, and Generative AI applications.',
      verificationId: 'AWS-AIP-2026-SOORAJ',
    },
    {
      id: 'azure_ai',
      title: 'Microsoft Certified: Azure AI Fundamentals',
      issuer: 'Microsoft',
      year: '2024',
      badgeColor: 'border-sky-500 text-sky-300 bg-sky-950/40',
      description: 'Validates foundational knowledge of Machine Learning workloads, Azure Computer Vision, NLP, and Cognitive Services on Microsoft Azure.',
      verificationId: 'MSFT-AI900-2024-SOORAJ',
    },
  ];

  return (
    <section id="skills" className="py-20 bg-[#F1ECE3] dark:bg-[#1A1F2E] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#1A1F2E] dark:text-[#F5F0E8] tracking-tight">
            Skills &amp; Industry <span className="text-[#B3822A] dark:text-[#D4A853]">Credentials</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-body">
            Comprehensive breakdown of Sooraj Krishnan V S&apos;s cloud engineering stack and certified achievements.
          </p>
        </div>

        {/* Certifications Showcase Cards */}
        <div className="mb-16">
          <h3 className="font-mono text-xs text-[#B3822A] dark:text-[#D4A853] uppercase tracking-wider font-bold mb-6 text-center sm:text-left flex items-center justify-center sm:justify-start">
            <Award className="w-4 h-4 mr-1.5 text-amber-500 dark:text-amber-400" />
            Verified Cloud Certifications:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
                className={`p-6 rounded-2xl bg-white dark:bg-[#0F1419] border border-gray-200 dark:border-gray-800 hover:border-[#B3822A]/60 dark:hover:border-[#D4A853]/60 cursor-pointer transition-all duration-300 shadow-md dark:shadow-lg relative overflow-hidden ${
                  selectedCert === cert.id ? 'ring-2 ring-[#B3822A] dark:ring-[#D4A853]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-700">
                    <Award className="w-6 h-6 text-[#B3822A] dark:text-[#D4A853]" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${cert.badgeColor}`}>
                    {cert.year}
                  </span>
                </div>

                <h4 className="font-display font-bold text-lg text-[#1A1F2E] dark:text-[#F5F0E8]">
                  {cert.title}
                </h4>
                <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mt-1 font-semibold">
                  Issued by {cert.issuer}
                </p>

                <p className="mt-3 text-xs text-gray-700 dark:text-gray-300 font-body leading-relaxed">
                  {cert.description}
                </p>

                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-gray-400">
                  <span className="flex items-center text-emerald-700 dark:text-emerald-400 font-bold">
                    <Check className="w-3.5 h-3.5 mr-1" /> Active Credential
                  </span>
                  <span className="text-gray-500">{cert.verificationId}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white dark:bg-[#0F1419] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-[#B3822A]/40 dark:hover:border-[#D4A853]/40 transition-colors shadow-sm dark:shadow-none"
            >
              <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                <div className="p-2 rounded-xl bg-gray-100 dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-700">
                  {cat.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-[#1A1F2E] dark:text-[#F5F0E8]">
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-3">
                {cat.skills.map((s) => (
                  <div key={s.name} className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#1A1F2E]/60 border border-gray-200 dark:border-gray-800/80">
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-[#1A1F2E] dark:text-[#F5F0E8]">{s.name}</span>
                      <span className="text-[#B3822A] dark:text-[#D4A853] text-[10px] bg-[#D4A853]/10 px-1.5 py-0.5 rounded border border-[#D4A853]/30">
                        {s.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 font-body mt-1">
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
