'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Briefcase,
  Layers,
  Zap,
  FileCode,
  Search,
  BrainCircuit,
  Award,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Server,
  Code2
} from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';

export default function JourneyWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);

  // Interactive Live Simulators state inside journey milestones
  const [fastApiSchema, setFastApiSchema] = useState('users_table');
  const [fastApiGenerated, setFastApiGenerated] = useState(false);
  const [parsingPdf, setParsingPdf] = useState(false);
  const [parsedConfidence, setParsedConfidence] = useState<number | null>(null);
  const { addLog } = useSystemLog();

  const steps = [
    {
      id: 'bsc',
      year: '2016 – 2019',
      title: 'Bachelor of Science in Computer Science',
      institution: 'Mahatma Gandhi University, Kottayam, India',
      type: 'education',
      badge: 'Academic Foundation',
      icon: <GraduationCap className="w-5 h-5 text-amber-400" />,
      shortDesc: 'Laid core groundwork in algorithms, database design, relational math, and object-oriented programming.',
      detail: 'Focused on fundamental computer science principles, C/C++ programming, SQL query optimization, linear algebra, and relational schema normalization.',
      highlights: [
        'Graduated with honors in Computer Science',
        'Built relational database management projects with complex SQL joins',
        'Deep understanding of operating systems, computer networking, and data structures',
      ],
      tech: ['Python', 'C++', 'SQL', 'DBMS', 'Data Structures'],
    },
    {
      id: 'msc',
      year: '2019 – 2021',
      title: 'Master of Science in Computer Science',
      institution: 'Mahatma Gandhi University, Kottayam, India',
      type: 'education',
      badge: 'Advanced Analytics & Big Data',
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
      shortDesc: 'Specialized in distributed systems, machine learning fundamentals, and scalable data processing.',
      detail: 'Conducted research and projects in statistical computing, data mining, distributed computing architectures, and neural networks.',
      highlights: [
        'Mastered advanced Python analytics stack (Pandas, NumPy, Scikit-Learn)',
        'Built experimental distributed computing models for parallel data processing',
        'Thesis project exploring automated feature extraction algorithms',
      ],
      tech: ['Python', 'Distributed Systems', 'Data Mining', 'Machine Learning', 'Linear Algebra'],
    },
    {
      id: 'tcs_join',
      year: 'August 2021',
      title: 'Joined Tata Consultancy Services (TCS)',
      institution: 'Kochi, India',
      type: 'career',
      badge: 'Cloud Data Engineer',
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
      shortDesc: 'Embarked on industrial-grade cloud data engineering across Azure enterprise environments.',
      detail: 'Stepped into architecting scalable ETL/ELT pipelines, streaming telemetry, and cloud data warehousing for high-stakes enterprise clients.',
      highlights: [
        'Assumed responsibilities for production data pipeline architecture',
        'Collaborated in Agile development workflows with multi-region engineering teams',
        'Established automated CI/CD practices for database migration scripts',
      ],
      tech: ['Microsoft Azure', 'ETL/ELT', 'Agile', 'Git', 'CI/CD'],
    },
    {
      id: 'medallion',
      year: '2022',
      title: 'Medallion Architecture on Azure Data Explorer',
      institution: 'Tata Consultancy Services',
      type: 'milestone',
      badge: 'Real-Time Streaming Milestone',
      icon: <Layers className="w-5 h-5 text-yellow-400" />,
      shortDesc: 'Architected streaming pipelines using Azure Event Hubs & Debezium CDC for real-time ADX & Grafana monitoring.',
      detail: 'Built an end-to-end Medallion Architecture (Bronze raw ingestion, Silver cleansed tables, Gold aggregated materialized views) in Azure Data Explorer. Debezium CDC captures changes directly from database logs into Event Hubs.',
      highlights: [
        'Sub-second visibility into system telemetry and operational health',
        'Live streaming dashboard integration with Grafana and Azure Data Explorer',
        'Zero-loss CDC capture handling high-burst transaction volumes',
      ],
      tech: ['Azure Event Hubs', 'Debezium', 'Azure Data Explorer (ADX)', 'KQL', 'Grafana', 'Medallion'],
      hasMedallionSim: true,
    },
    {
      id: 'fastapi',
      year: '2023',
      title: 'Dynamic FastAPI & Pydantic API Generator',
      institution: 'Tata Consultancy Services',
      type: 'milestone',
      badge: '60% Dev Acceleration Framework',
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      shortDesc: 'Automated REST API creation, slashing development time from 5 days down to 2 days.',
      detail: 'Engineered a meta-framework using FastAPI and Pydantic that dynamically inspects database table definitions and automatically exposes standard, validated GET REST APIs with OpenAPI docs.',
      highlights: [
        'Delivered 60% reduction in REST API creation cycle time',
        'Eliminated boilerplate boilerplate code across microservices',
        'Strict runtime type safety and auto-generated Swagger documentation',
      ],
      tech: ['FastAPI', 'Pydantic', 'Python', 'REST APIs', 'PostgreSQL'],
      hasFastApiSim: true,
    },
    {
      id: 'aws_parser',
      year: '2024',
      title: 'AWS Document Parser with Step Functions & Textract',
      institution: 'Tata Consultancy Services',
      type: 'milestone',
      badge: 'AI / OCR Precision Breakthrough',
      icon: <FileCode className="w-5 h-5 text-purple-400" />,
      shortDesc: 'Led development of AWS-based parser achieving 80%+ precision across complex PDF layouts.',
      detail: 'Combined AWS Step Functions, Textract layout analysis, Amazon Comprehend NLP, and Augmented AI (A2I) for human-in-the-loop review on edge cases.',
      highlights: [
        'Reached 80%+ precision in extracting structured tables from messy PDFs',
        'Automated document routing and sentiment/entity extraction',
        'Scalable serverless pipeline handling thousands of multi-page PDFs concurrently',
      ],
      tech: ['AWS Step Functions', 'AWS Textract', 'Amazon Comprehend', 'AWS A2I', 'Python', 'PDF Parsing'],
      hasAwsParserSim: true,
    },
    {
      id: 'web_scraping',
      year: '2025',
      title: 'Automated BeautifulSoup & pdfplumber Ingestion Engine',
      institution: 'Tata Consultancy Services',
      type: 'milestone',
      badge: 'Near-Instant Research Platform',
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      shortDesc: 'Replaced manual stakeholder research with automated web & document ingestion into PostgreSQL.',
      detail: 'Built custom web scrapers and unstructured text extractors using BeautifulSoup and pdfplumber, streaming unstructured stakeholder data directly into indexed PostgreSQL tables.',
      highlights: [
        'Transformed weeks of manual web research into a real-time searchable interface',
        'Robust error handling against shifting DOM structures and dynamic JS pages',
        'Structured query interface for stakeholder intelligence reports',
      ],
      tech: ['BeautifulSoup', 'pdfplumber', 'PostgreSQL', 'Python', 'Web Scraping'],
    },
    {
      id: 'nlp_certs',
      year: '2026',
      title: 'Topic Modeling ML & Databricks Associate Certification',
      institution: 'Tata Consultancy Services & Industry Credentials',
      type: 'milestone',
      badge: 'Certified Industry Leader',
      icon: <BrainCircuit className="w-5 h-5 text-rose-400" />,
      shortDesc: 'Created Unsupervised ML topic modeling pipelines and earned top-tier Databricks & AWS certifications.',
      detail: 'Built text analysis systems using Gensim & SpaCy for automatic trend identification in large text corpora. Formally certified as Databricks Certified Data Engineer Associate (2026) and AWS Certified AI Practitioner (2026).',
      highlights: [
        'Databricks Certified Data Engineer Associate (2026)',
        'AWS Certified AI Practitioner (2026)',
        'Microsoft Certified: Azure AI Fundamentals (2024)',
        'Unsupervised semantic cluster visualization for enterprise stakeholders',
      ],
      tech: ['Databricks', 'Apache Spark', 'Gensim', 'SpaCy', 'Generative AI', 'Topic Modeling'],
    },
  ];

  const currentStep = steps[activeStep];

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  return (
    <section id="journey" className="py-20 bg-[#1A1F2E] relative overflow-hidden">
      {/* Background Data River Grid */}
      <div className="absolute inset-0 data-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/30 text-xs font-mono text-[#D4A853] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE CAREER WALKTHROUGH</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
            Walk the Journey <span className="text-[#D4A853]">Sooraj Did</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 font-body">
            Step chronologically through Sooraj&apos;s academic roots, cloud milestones, and breakthrough data engineering achievements.
          </p>
        </div>

        {/* Timeline Path Stepper Navigation */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-max px-2">
            {steps.map((step, idx) => {
              const isCurrent = idx === activeStep;
              const isPast = idx < activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStep(idx);
                    addLog('DATA_ACTION', `Journey Milestone Walked: [${step.year}] ${step.title}`, `Type: ${step.badge}`);
                  }}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-300 border ${
                    isCurrent
                      ? 'bg-[#D4A853] text-[#1A1F2E] border-[#D4A853] font-bold shadow-lg shadow-[#D4A853]/20 scale-105'
                      : isPast
                      ? 'bg-[#2D3447] text-[#D4A853] border-gray-700 hover:border-[#D4A853]'
                      : 'bg-[#0F1419] text-gray-400 border-gray-800 hover:text-white'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-current shrink-0">
                    {idx + 1}
                  </span>
                  <span className="whitespace-nowrap">{step.year}</span>
                  {isCurrent && <ChevronRight className="w-4 h-4 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Journey Card */}
        <div className="bg-[#0F1419] border border-[#D4A853]/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Card Top Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-[#1A1F2E] border border-gray-700 shadow-inner">
                {currentStep.icon}
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#2D3447] text-[#D4A853] mb-1">
                  {currentStep.badge}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-3xl text-[#F5F0E8]">
                  {currentStep.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-mono">
                  {currentStep.institution} • <span className="text-emerald-400">{currentStep.year}</span>
                </p>
              </div>
            </div>

            {/* Step Stepper Controllers */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={activeStep === 0}
                className="p-2.5 rounded-xl bg-[#1A1F2E] hover:bg-[#2D3447] disabled:opacity-30 text-gray-300 border border-gray-700 transition"
                title="Previous Milestone"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-gray-400 px-2">
                {activeStep + 1} / {steps.length}
              </span>
              <button
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
                className="p-2.5 rounded-xl bg-[#D4A853] hover:bg-[#E8C878] disabled:opacity-30 text-[#1A1F2E] font-bold transition shadow"
                title="Next Milestone"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Card Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Left Content Description */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg text-amber-200 font-display font-medium leading-relaxed">
                &ldquo;{currentStep.shortDesc}&rdquo;
              </p>
              <p className="text-sm sm:text-base text-gray-300 font-body leading-relaxed">
                {currentStep.detail}
              </p>

              {/* Highlights Checklist */}
              <div>
                <h4 className="font-mono text-xs text-[#D4A853] uppercase tracking-wider font-bold mb-3">
                  Key Deliverables &amp; Technical Highlights:
                </h4>
                <ul className="space-y-2">
                  {currentStep.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4 className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Technologies Utilized:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentStep.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-[#1A1F2E] border border-gray-700 text-xs font-mono text-[#D4A853]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Visualizer / Demonstration Box */}
            <div className="lg:col-span-5 bg-[#1A1F2E] border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
              {currentStep.hasMedallionSim && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="font-mono text-xs font-bold text-[#D4A853] flex items-center">
                      <Layers className="w-4 h-4 mr-1 text-yellow-400" />
                      ADX Medallion Streaming Simulator
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      LIVE CDC
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2 bg-[#0F1419] border border-amber-900/50 rounded flex items-center justify-between">
                      <span className="text-amber-400 font-bold">🥉 Bronze Layer:</span>
                      <span className="text-gray-300">Azure Event Hubs + Debezium</span>
                    </div>
                    <div className="p-2 bg-[#0F1419] border border-sky-900/50 rounded flex items-center justify-between">
                      <span className="text-sky-400 font-bold">🥈 Silver Layer:</span>
                      <span className="text-gray-300">PySpark Cleanse &amp; Dedupe</span>
                    </div>
                    <div className="p-2 bg-[#0F1419] border border-emerald-900/50 rounded flex items-center justify-between">
                      <span className="text-emerald-400 font-bold">🥇 Gold Layer:</span>
                      <span className="text-gray-300">ADX Materialized Views &amp; Grafana</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0F1419] rounded border border-gray-800 text-[11px] font-mono text-gray-400 space-y-1">
                    <p className="text-[#D4A853]">KQL Telemetry Query Preview:</p>
                    <code className="text-emerald-300 block">
                      SystemHealthTelemetry | summarize AvgLatency = avg(LatencyMs) by bin(Timestamp, 1m)
                    </code>
                  </div>
                </div>
              )}

              {currentStep.hasFastApiSim && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="font-mono text-xs font-bold text-emerald-400 flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Dynamic FastAPI Generator Simulator
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">60% Dev Time Cut</span>
                  </div>

                  <p className="text-xs text-gray-300 font-mono">
                    Select a database schema to simulate instant API route generation:
                  </p>

                  <select
                    value={fastApiSchema}
                    onChange={(e) => {
                      setFastApiSchema(e.target.value);
                      setFastApiGenerated(false);
                    }}
                    className="w-full bg-[#0F1419] border border-gray-700 text-xs font-mono text-[#D4A853] p-2 rounded outline-none focus:border-[#D4A853]"
                  >
                    <option value="users_table">DB Table: user_telemetry_logs</option>
                    <option value="orders_table">DB Table: enterprise_orders</option>
                    <option value="sensor_table">DB Table: iot_sensor_readings</option>
                  </select>

                  <button
                    onClick={() => setFastApiGenerated(true)}
                    className="w-full py-2 bg-[#D4A853] hover:bg-[#E8C878] text-[#1A1F2E] font-mono font-bold text-xs rounded transition flex items-center justify-center space-x-1"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Generate OpenAPI Route (5 Days ➔ 2 Days)</span>
                  </button>

                  {fastApiGenerated && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 bg-[#0F1419] rounded border border-emerald-500/40 text-[11px] font-mono text-emerald-300 space-y-1"
                    >
                      <p className="font-bold text-emerald-400">✅ Dynamic GET Route Auto-Generated!</p>
                      <p className="text-gray-300">Endpoint: <span className="text-amber-300">GET /api/v1/{fastApiSchema}</span></p>
                      <p className="text-gray-400 text-[10px]">Pydantic schema validated • Response: 200 OK (12ms)</p>
                    </motion.div>
                  )}
                </div>
              )}

              {currentStep.hasAwsParserSim && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="font-mono text-xs font-bold text-purple-400 flex items-center">
                      <FileCode className="w-4 h-4 mr-1" />
                      AWS Multi-Modal PDF OCR Simulator
                    </span>
                    <span className="text-[10px] font-mono text-[#D4A853]">80%+ Precision</span>
                  </div>

                  <p className="text-xs text-gray-300 font-mono">
                    Simulate Step Functions + Textract table parsing on a complex layout PDF:
                  </p>

                  <div className="p-3 bg-[#0F1419] border border-dashed border-gray-700 rounded text-center">
                    <p className="text-xs text-gray-400 font-mono">Sample PDF: <span className="text-white">Quarterly_Financial_Report.pdf</span></p>
                  </div>

                  <button
                    onClick={() => {
                      setParsingPdf(true);
                      setParsedConfidence(null);
                      setTimeout(() => {
                        setParsingPdf(false);
                        setParsedConfidence(87.4);
                      }, 1200);
                    }}
                    disabled={parsingPdf}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono font-bold text-xs rounded transition flex items-center justify-center space-x-2"
                  >
                    {parsingPdf ? (
                      <span>Running AWS Step Functions...</span>
                    ) : (
                      <>
                        <BrainCircuit className="w-4 h-4" />
                        <span>Run Textract + Comprehend Parser</span>
                      </>
                    )}
                  </button>

                  {parsedConfidence && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-2.5 bg-[#0F1419] border border-purple-500/40 rounded text-[11px] font-mono text-purple-200 space-y-1"
                    >
                      <p className="text-purple-300 font-bold">🎯 Parsing Result Confidence: {parsedConfidence}%</p>
                      <p className="text-gray-300">Identified: 14 Key-Value Pairs, 3 Nested Tables</p>
                      <p className="text-emerald-400">A2I Human-in-Loop: Passed (No Manual Review Needed)</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Default Graphic info box if no specific simulator */}
              {!currentStep.hasMedallionSim && !currentStep.hasFastApiSim && !currentStep.hasAwsParserSim && (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#2D3447] border border-[#D4A853] flex items-center justify-center text-[#D4A853]">
                    {currentStep.icon}
                  </div>
                  <p className="font-display font-semibold text-sm text-[#F5F0E8]">
                    {currentStep.badge}
                  </p>
                  <p className="font-mono text-xs text-gray-400">
                    Step {activeStep + 1} of {steps.length} in Sooraj Krishnan V S&apos;s data engineering journey.
                  </p>
                </div>
              )}

              {/* Step Counter Footer inside box */}
              <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>Milestone: {currentStep.id}</span>
                <span className="text-[#D4A853]">TCS Kochi / Cloud Eng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
