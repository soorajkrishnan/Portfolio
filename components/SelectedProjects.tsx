'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Zap,
  FileCode,
  Search,
  BrainCircuit,
  CheckCircle2,
  Terminal,
  Database,
  Sparkles,
  ArrowDown,
  GitCommit,
  Radio
} from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';

interface SelectedProjectsProps {
  onOpenTerminal: () => void;
}

export default function SelectedProjects({ onOpenTerminal }: SelectedProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'azure' | 'aws' | 'python_api' | 'ml'>('all');
  const { addLog } = useSystemLog();

  // Projects in explicit descending timeline order requested:
  // 1. Topic modeling
  // 2. Automated pdfplumber ingestion
  // 3. AWS document parser
  // 4. Dynamic API
  // 5. ADX (Azure Data Explorer)
  const projects = [
    {
      id: 'topic_modeling',
      orderNum: '01',
      stepBadge: 'Unsupervised ML & NLP',
      title: 'Topic Modeling & Semantic Trend Analysis System',
      category: 'ml',
      categoryLabel: 'Machine Learning & NLP',
      metric: 'Large-Scale Text Processing',
      impact: 'Automated trend discovery across enterprise textual datasets.',
      description:
        'Created a topic modeling platform using Unsupervised Machine Learning and Semantic Analysis to process large-scale text datasets, delivering automated trend reports and interactive visualizations for business leadership.',
      stack: ['Python', 'Gensim', 'SpaCy', 'LDA', 'PyLDAvis', 'Pandas', 'Flask'],
      highlights: [
        'Applied Latent Dirichlet Allocation (LDA) for topic discovery',
        'Built semantic tokenization and lemmatization pipelines with SpaCy',
        'Generated interactive PyLDAvis topic clusters for business decision makers',
      ],
      badgeBg: 'bg-rose-950/60 text-rose-300 border-rose-500/30',
      icon: <BrainCircuit className="w-6 h-6 text-rose-400" />,
      accentColor: 'rose',
    },
    {
      id: 'pdf_scraping_engine',
      orderNum: '02',
      stepBadge: 'Web & PDF Ingestion Engine',
      title: 'Automated BeautifulSoup & pdfplumber Ingestion Engine',
      category: 'python_api',
      categoryLabel: 'Web Scraping & Ingestion',
      metric: 'Near-Instant Research',
      impact: 'Replaced weeks of manual research with automated indexing.',
      description:
        'Developed an automated data ingestion platform using BeautifulSoup and pdfplumber to parse unstructured stakeholder web content and PDF documents into PostgreSQL, providing a near-instant research platform.',
      stack: ['BeautifulSoup4', 'pdfplumber', 'PostgreSQL', 'Python', 'Alembic', 'Docker'],
      highlights: [
        'Built resilient web scrapers capable of navigating shifting HTML DOM structures',
        'Implemented full-text search indexing in PostgreSQL for rapid lookups',
        'Automated document metadata extraction and taxonomy assignment',
      ],
      badgeBg: 'bg-sky-950/60 text-sky-300 border-sky-500/30',
      icon: <Search className="w-6 h-6 text-sky-400" />,
      accentColor: 'sky',
    },
    {
      id: 'aws_document_parser',
      orderNum: '03',
      stepBadge: 'Serverless OCR & AI',
      title: 'AWS Multi-Modal Document Parsing Engine',
      category: 'aws',
      categoryLabel: 'AWS & Generative AI/OCR',
      metric: '80%+ Precision',
      impact: 'Accurately extracted structured key-value pairs from complex PDFs.',
      description:
        'Led the development of a serverless AWS document parser leveraging Step Functions, Textract, Comprehend, and Augmented AI (A2I) for human-in-the-loop validation on complex PDF document layouts.',
      stack: ['AWS Step Functions', 'AWS Textract', 'Amazon Comprehend', 'AWS A2I', 'S3', 'Python'],
      highlights: [
        'Orchestrated multi-step serverless document processing state machines',
        'Integrated AWS A2I for automatic routing of low-confidence layout predictions',
        'Extracted tabular metrics from unstructured PDF reports automatically',
      ],
      badgeBg: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
      icon: <FileCode className="w-6 h-6 text-purple-400" />,
      accentColor: 'purple',
    },
    {
      id: 'fastapi_generator',
      orderNum: '04',
      stepBadge: 'FastAPI REST Framework',
      title: 'Dynamic FastAPI & Pydantic REST API Generator',
      category: 'python_api',
      categoryLabel: 'Framework Automation',
      metric: '60% Dev Time Cut',
      impact: 'Slashed REST API creation cycle from 5 days down to 2 days.',
      description:
        'Developed an automated API generation framework using FastAPI and Pydantic that dynamically inspects database schema structures to construct fully typed GET REST APIs with auto-generated Swagger documentation.',
      stack: ['FastAPI', 'Pydantic v2', 'Python 3.11', 'PostgreSQL', 'SQLAlchemy', 'Docker'],
      highlights: [
        'Automated model inspection and request/response schema creation',
        'Integrated Pydantic data validation with custom exception handlers',
        'Adopted by engineering teams to rapidly expose read endpoints',
      ],
      badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      accentColor: 'emerald',
    },
    {
      id: 'medallion_adx',
      orderNum: '05',
      stepBadge: 'Real-Time ADX Telemetry',
      title: 'Azure Data Explorer Medallion Streaming Pipeline',
      category: 'azure',
      categoryLabel: 'Streaming & Medallion',
      metric: 'Real-Time Health Visibility',
      impact: 'Sub-second telemetry ingestion with zero-loss CDC capture.',
      description:
        'Built real-time data pipelines using Azure Event Hubs and Debezium change-data-capture to establish a Medallion Architecture (Bronze, Silver, Gold) in Azure Data Explorer, giving stakeholders live system health visibility via Grafana.',
      stack: ['Azure Event Hubs', 'Debezium CDC', 'Azure Data Explorer', 'KQL', 'Grafana', 'PySpark'],
      highlights: [
        'Integrated Debezium for real-time relational log mining',
        'Structured KQL Materialized Views for instant Gold layer aggregations',
        'Built interactive Grafana dashboards for cluster performance tracking',
      ],
      badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
      icon: <Layers className="w-6 h-6 text-amber-400" />,
      accentColor: 'amber',
    },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section id="projects" className="py-24 bg-[#0F1419] relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 data-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
              Engineering <span className="text-[#D4A853]">Timeline</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-300 font-body max-w-xl leading-relaxed">
              Data architecture projects in chronological sequence: from NLP topic modeling down to real-time Azure Data Explorer telemetry.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 font-mono text-xs">
            {[
              { id: 'all', label: 'All Systems' },
              { id: 'ml', label: 'Topic Modeling' },
              { id: 'python_api', label: 'Ingestion & APIs' },
              { id: 'aws', label: 'AWS Serverless' },
              { id: 'azure', label: 'Azure ADX' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id as any);
                  addLog('PIPELINE_INSPECT', `Project Filter Applied: ${tab.label}`, 'Architectural projects filtered');
                }}
                className={`px-3.5 py-2 rounded-xl border transition-all ${
                  filter === tab.id
                    ? 'bg-[#D4A853] text-[#1A1F2E] font-bold border-[#D4A853] shadow-md scale-105'
                    : 'bg-[#1A1F2E] text-gray-300 border-gray-800 hover:text-white hover:border-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Z-Pattern Vertical Timeline Canvas */}
        <div className="relative">
          {/* Central Vertical Connector Conduit Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-1 bg-gradient-to-b from-rose-500/80 via-purple-500/60 to-amber-500/80 transform md:-translate-x-1/2 rounded-full pointer-events-none" />

          {/* Timeline Nodes */}
          <div className="space-y-16 md:space-y-20 relative">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0; // Even indices (0, 2, 4) on Left, Odd indices (1, 3) on Right

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Timeline Center Node Badge/Indicator */}
                  <div className="absolute left-6 md:left-1/2 top-0 transform -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="w-12 h-12 rounded-2xl bg-[#0F1419] border-2 border-[#D4A853] flex items-center justify-center shadow-xl shadow-[#D4A853]/20 text-[#D4A853] font-mono text-xs font-bold"
                    >
                      <span>{project.orderNum}</span>
                    </motion.div>
                  </div>

                  {/* Card Container in Z-Pattern */}
                  <div
                    className={`w-full pl-16 md:pl-0 md:w-[calc(50%-3rem)] ${
                      isEven
                        ? 'md:mr-auto md:text-left'
                        : 'md:ml-auto md:text-left'
                    }`}
                  >
                    <div className="bg-[#1A1F2E] border border-gray-800 hover:border-[#D4A853] rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4A853]/15 group relative overflow-hidden">
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-gray-800/80 pb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 rounded-xl bg-[#0F1419] border border-gray-800 group-hover:border-[#D4A853]/50 transition-colors shadow-inner">
                            {project.icon}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                              {project.stepBadge}
                            </span>
                            <span className="text-xs font-mono text-gray-400">
                              {project.categoryLabel}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border ${project.badgeBg}`}
                        >
                          {project.metric}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#F5F0E8] group-hover:text-[#D4A853] transition-colors">
                        {project.title}
                      </h3>

                      {/* Impact Statement */}
                      <p className="text-xs font-mono text-emerald-400 mt-2 font-semibold flex items-center">
                        <Zap className="w-3.5 h-3.5 mr-1 text-amber-400 shrink-0" />
                        <span>{project.impact}</span>
                      </p>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-gray-300 font-body leading-relaxed">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-5 space-y-2 border-t border-gray-800/80 pt-4">
                        {project.highlights.map((h, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs text-gray-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A853] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="mt-6 pt-4 border-t border-gray-800 flex flex-wrap gap-1.5">
                        {project.stack.map((s) => (
                          <span
                            key={s}
                            className="px-2.5 py-1 rounded-lg bg-[#0F1419] border border-gray-800 text-[10px] font-mono text-[#D4A853]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* KQL Terminal CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#2D3447] via-[#1A1F2E] to-[#0F1419] border border-[#D4A853]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#D4A853]">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>INTERACTIVE DATA EASTER EGG</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F5F0E8]">
              Want to query Sooraj&apos;s project metadata directly?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-body max-w-xl">
              Launch our KQL Data Shell to execute live SQL/KQL queries like <code className="text-emerald-400">SELECT * FROM journey</code> or <code className="text-amber-300">SHOW MEDALLION STATUS</code>.
            </p>
          </div>

          <button
            onClick={onOpenTerminal}
            className="px-6 py-3.5 rounded-full bg-[#D4A853] hover:bg-[#E8C878] text-[#1A1F2E] font-display font-bold text-sm shadow-xl flex items-center space-x-2 shrink-0 hover:scale-105 transition-all"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch KQL Shell</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
