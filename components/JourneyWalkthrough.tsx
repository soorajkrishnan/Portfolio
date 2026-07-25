'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  Layers,
  Filter,
  Zap,
  FileCode,
  Search,
  BrainCircuit,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';

export default function JourneyWalkthrough() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'cloud' | 'ai' | 'ml' | 'education'>('all');
  const { addLog } = useSystemLog();

  // Milestone data in strict DESCENDING order (2026 PRESENT down to 2016)
  const steps = [
    {
      id: 'medallion_adx_2026',
      year: '2026',
      period: '2025 – 2026 (Present)',
      isLatest: true,
      title: 'Azure Data Explorer Medallion Pipeline & KQL Observability',
      institution: 'Tata Consultancy Services & Industry Credentials',
      category: 'cloud',
      type: 'milestone',
      badge: 'Real-Time Streaming & KQL Analytics',
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      shortDesc: 'Engineered sub-second telemetry ingestion with Azure Event Hubs, Debezium CDC, and ADX Materialized Views. Earned Databricks & AWS certifications.',
      detail: 'Architected an end-to-end Medallion Lakehouse (Bronze ingestion, Silver cleansing, Gold materialized aggregations) in Azure Data Explorer. Captured database change logs via Debezium CDC into Event Hubs with sub-second Grafana monitoring.',
      highlights: [
        'Zero-loss CDC capture handling high-burst relational transaction volumes',
        'Sub-second query visibility into system health telemetry via KQL Materialized Views',
        'Databricks Certified Data Engineer Associate (2026) & AWS Certified AI Practitioner (2026)',
        'Microsoft Certified: Azure AI Fundamentals (2024)',
      ],
      tech: ['Azure Data Explorer (ADX)', 'KQL', 'Azure Event Hubs', 'Debezium CDC', 'Grafana', 'Databricks', 'PySpark'],
      hasKqlSim: true,
    },
    {
      id: 'fastapi_2025',
      year: '2025',
      period: '2024 – 2025',
      isLatest: false,
      title: 'Dynamic FastAPI & Pydantic API Generator',
      institution: 'Tata Consultancy Services',
      category: 'ai',
      type: 'milestone',
      badge: '60% Dev Acceleration Framework',
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      shortDesc: 'Automated REST API creation, slashing development cycle time from 5 days down to 2 days.',
      detail: 'Engineered a meta-framework using FastAPI and Pydantic that dynamically inspects database table schemas and automatically exposes standard, validated GET REST endpoints with OpenAPI docs.',
      highlights: [
        'Delivered 60% reduction in REST API creation cycle time across microservice teams',
        'Eliminated repetitive boilerplate code in data exposure layers',
        'Strict runtime type validation with Pydantic v2 and auto-generated Swagger documentation',
      ],
      tech: ['FastAPI', 'Pydantic v2', 'Python 3.11', 'PostgreSQL', 'SQLAlchemy', 'OpenAPI'],
      hasFastApiSim: true,
    },
    {
      id: 'aws_parser_2024',
      year: '2024',
      period: '2023 – 2024',
      isLatest: false,
      title: 'AWS Document Parser with Step Functions & Textract',
      institution: 'Tata Consultancy Services',
      category: 'ai',
      type: 'milestone',
      badge: 'AI / OCR Precision Breakthrough',
      icon: <FileCode className="w-5 h-5 text-purple-400" />,
      shortDesc: 'Led development of serverless AWS parser achieving 80%+ precision across complex PDF form layouts.',
      detail: 'Combined AWS Step Functions state machines, Textract table layout analysis, Amazon Comprehend NLP, and AWS Augmented AI (A2I) for human-in-the-loop verification on edge cases.',
      highlights: [
        'Achieved 80%+ precision in extracting key-value pairs and tabular data from multi-page PDFs',
        'Automated document routing and sentiment/entity extraction pipelines',
        'Scalable serverless pipeline processing thousands of documents concurrently',
      ],
      tech: ['AWS Step Functions', 'AWS Textract', 'Amazon Comprehend', 'AWS A2I', 'AWS S3', 'Python'],
      hasAwsParserSim: true,
    },
    {
      id: 'web_scraping_2023',
      year: '2023',
      period: '2022 – 2023',
      isLatest: false,
      title: 'Automated BeautifulSoup & pdfplumber Ingestion Engine',
      institution: 'Tata Consultancy Services',
      category: 'ml',
      type: 'milestone',
      badge: 'Near-Instant Research Platform',
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      shortDesc: 'Replaced weeks of manual stakeholder research with automated web & document ingestion into indexed PostgreSQL tables.',
      detail: 'Built custom web scrapers and unstructured text extractors using BeautifulSoup and pdfplumber, streaming unstructured stakeholder data directly into PostgreSQL vector and full-text indexes.',
      highlights: [
        'Transformed manual web research into a real-time searchable interface with <50ms query latency',
        'Robust error-handling algorithms against shifting HTML DOM structures',
        'Automated document metadata taxonomy assignment and entity classification',
      ],
      tech: ['BeautifulSoup4', 'pdfplumber', 'PostgreSQL', 'Python', 'Full-Text Search', 'Docker'],
      hasIngestSim: true,
    },
    {
      id: 'topic_modeling_2022',
      year: '2022',
      period: '2021 – 2022',
      isLatest: false,
      title: 'Topic Modeling ML & Semantic Trend Analysis',
      institution: 'Tata Consultancy Services',
      category: 'ml',
      type: 'milestone',
      badge: 'Unsupervised ML & NLP',
      icon: <BrainCircuit className="w-5 h-5 text-rose-400" />,
      shortDesc: 'Created topic modeling pipelines using Gensim & SpaCy for automatic trend discovery in enterprise text corpora.',
      detail: 'Applied Latent Dirichlet Allocation (LDA) and semantic word embeddings to parse large unstructured text datasets, producing interactive PyLDAvis topic clusters for executive decision makers.',
      highlights: [
        'Automated topic discovery across thousands of unstructured stakeholder feedback logs',
        'SpaCy semantic tokenization, lemmatization, and stop-word filtering pipeline',
        'Interactive semantic topic visualization dashboards for leadership reporting',
      ],
      tech: ['Python', 'Gensim', 'SpaCy', 'LDA', 'PyLDAvis', 'Pandas', 'Flask'],
      hasTopicSim: true,
    },
    {
      id: 'tcs_join_2021',
      year: '2021',
      period: 'August 2021',
      isLatest: false,
      title: 'Joined Tata Consultancy Services (TCS) as Cloud Data Engineer',
      institution: 'Kochi, India',
      category: 'cloud',
      type: 'career',
      badge: 'Enterprise Career Milestone',
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
      shortDesc: 'Embarked on industrial-grade cloud data engineering across Azure & AWS enterprise environments.',
      detail: 'Stepped into architecting scalable ETL/ELT pipelines, streaming telemetry, and cloud data warehousing for high-stakes enterprise clients at TCS.',
      highlights: [
        'Assumed responsibilities for production data pipeline architecture and monitoring',
        'Collaborated in Agile development workflows with multi-region engineering teams',
        'Established automated CI/CD practices for database migration scripts and deployment',
      ],
      tech: ['Microsoft Azure', 'AWS', 'ETL/ELT', 'Agile', 'Git', 'CI/CD'],
      isCareerCard: true,
    },
    {
      id: 'msc_2021',
      year: '2019-2021',
      period: '2019 – 2021',
      isLatest: false,
      title: 'Master of Science in Computer Science',
      institution: 'Mahatma Gandhi University, Kottayam, India',
      category: 'education',
      type: 'education',
      badge: 'Advanced Analytics & Big Data',
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
      shortDesc: 'Specialized in distributed systems, machine learning fundamentals, and scalable data processing architectures.',
      detail: 'Conducted advanced coursework and research in statistical computing, data mining, distributed computing architectures, and neural networks.',
      highlights: [
        'Mastered advanced Python analytics stack (Pandas, NumPy, Scikit-Learn)',
        'Built experimental distributed computing models for parallel data processing',
        'Master thesis project exploring automated feature extraction algorithms',
      ],
      tech: ['Python', 'Distributed Systems', 'Data Mining', 'Machine Learning', 'Linear Algebra'],
      isEduCard: true,
    },
    {
      id: 'bsc_2019',
      year: '2016-2019',
      period: '2016 – 2019',
      isLatest: false,
      title: 'Bachelor of Science in Computer Science',
      institution: 'Mahatma Gandhi University, Kottayam, India',
      category: 'education',
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
      isEduCard: true,
    },
  ];

  // Filtered steps
  const filteredSteps = steps.filter((step) => {
    if (categoryFilter === 'all') return true;
    return step.category === categoryFilter;
  });

  return (
    <section id="journey" className="py-24 bg-[#F1ECE3] dark:bg-[#141824] relative overflow-hidden text-[#1A1F2E] dark:text-[#F5F0E8] transition-colors duration-300">
      {/* Background Decorative Data River */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4A853]/10 via-transparent dark:via-[#141824]/90 to-transparent dark:to-[#0B0E14] pointer-events-none" />
      <div className="absolute inset-0 data-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#1A1F2E] dark:text-[#F5F0E8] tracking-tight">
            Engineering <span className="text-[#B3822A] dark:text-[#D4A853]">Journey</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-body leading-relaxed">
            Data engineering milestones in descending chronological order — from real-time Azure Data Explorer telemetry down to academic foundations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 font-mono text-xs">
          {[
            { id: 'all', label: 'All Milestones (8)' },
            { id: 'cloud', label: 'Cloud & Telemetry (ADX / Azure)' },
            { id: 'ai', label: 'AI & API Automation (AWS / FastAPI)' },
            { id: 'ml', label: 'ML & Ingestion (Gensim / Scrapers)' },
            { id: 'education', label: 'Academic Foundations (MSc / BSc)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id as any);
                addLog('PIPELINE_INSPECT', `Journey Category Filter: ${cat.label}`, 'Chronological sequence filtered');
              }}
              className={`px-3.5 py-2 rounded-xl border transition-all ${
                categoryFilter === cat.id
                  ? 'bg-[#D4A853] dark:bg-[#2D3447] text-[#1A1F2E] dark:text-[#D4A853] border-[#B3822A] dark:border-[#D4A853] font-bold shadow-md'
                  : 'bg-white dark:bg-[#0B0E14]/80 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-800 hover:text-black dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Chronological Vertical Timeline (Space Fully Utilized Across 100% Width) */}
        <div className="relative max-w-6xl mx-auto">
          {/* Glowing Vertical Conduit Line running down the left */}
          <div className="absolute left-5 sm:left-8 top-3 bottom-8 w-1 bg-gradient-to-b from-[#D4A853] via-emerald-500/50 via-purple-500/40 to-blue-500/30 rounded-full pointer-events-none" />

          <div className="space-y-12 relative">
            {filteredSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative flex flex-col w-full"
              >
                {/* Glowing Timeline Marker Node */}
                <div className="absolute left-5 sm:left-8 top-6 transform -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-2xl bg-white dark:bg-[#0B0E14] border-2 border-[#B3822A] dark:border-[#D4A853] flex items-center justify-center shadow-md dark:shadow-lg text-[#B3822A] dark:text-[#D4A853]">
                    {step.icon}
                  </div>
                </div>

                {/* Full-Width Milestone Card (Fills 100% space) */}
                <div className="w-full pl-14 sm:pl-20">
                  <div className="bg-white dark:bg-[#0B0E14] border border-gray-200 dark:border-gray-800 hover:border-[#B3822A]/60 dark:hover:border-[#D4A853]/60 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-md dark:shadow-2xl hover:shadow-xl group">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800/80 pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#D4A853] text-[#1A1F2E]">
                          {step.year}
                        </span>
                        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30">
                          {step.period}
                        </span>
                        {step.isLatest && (
                          <span className="text-[10px] font-mono bg-emerald-500 text-black font-bold px-2 py-0.5 rounded">
                            CURRENT ROLE
                          </span>
                        )}
                        <span className="text-xs font-mono text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-[#1A1F2E] px-2.5 py-0.5 rounded border border-gray-200 dark:border-gray-800">
                          {step.badge}
                        </span>
                      </div>

                      <span className="text-xs font-mono text-gray-600 dark:text-gray-400 font-medium">
                        {step.institution}
                      </span>
                    </div>

                    {/* Main Card Content */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1A1F2E] dark:text-[#F5F0E8] group-hover:text-[#B3822A] dark:group-hover:text-[#D4A853] transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-display font-medium leading-relaxed bg-amber-500/10 dark:bg-[#1A1F2E]/60 p-3.5 rounded-xl border-l-4 border-[#B3822A] dark:border-[#D4A853]">
                        &ldquo;{step.shortDesc}&rdquo;
                      </p>

                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-body leading-relaxed">
                        {step.detail}
                      </p>

                      {/* Deliverables */}
                      <div>
                        <h4 className="font-mono text-xs text-[#B3822A] dark:text-[#D4A853] uppercase tracking-wider font-bold mb-2 flex items-center">
                          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-500 dark:text-amber-400" />
                          Key Outcomes &amp; Accomplishments:
                        </h4>
                        <ul className="space-y-2">
                          {step.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start space-x-2 text-xs text-gray-700 dark:text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {step.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg bg-[#1A1F2E] border border-gray-800 text-[11px] font-mono text-[#D4A853]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
