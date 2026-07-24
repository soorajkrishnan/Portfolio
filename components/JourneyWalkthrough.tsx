'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Briefcase,
  Layers,
  Zap,
  FileCode,
  Search,
  BrainCircuit,
  CheckCircle2,
  Sparkles,
  Terminal,
  Code2,
  Database,
  Cpu,
  Server,
  Globe
} from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';

export default function JourneyWalkthrough() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'cloud' | 'ai' | 'ml' | 'education'>('all');

  // Interactive Live Simulators state inside journey milestones
  const [kqlQueryText, setKqlQueryText] = useState('SystemHealthTelemetry | summarize AvgLatency = avg(LatencyMs) by bin(Timestamp, 1m)');
  const [kqlExecuted, setKqlExecuted] = useState(false);

  const [fastApiSchema, setFastApiSchema] = useState('user_telemetry_logs');
  const [fastApiGenerated, setFastApiGenerated] = useState(false);

  const [parsingPdf, setParsingPdf] = useState(false);
  const [parsedConfidence, setParsedConfidence] = useState<number | null>(null);

  const [ingestPdfParsing, setIngestPdfParsing] = useState(false);
  const [ingestPdfDone, setIngestPdfDone] = useState(false);

  const [topicClusterActive, setTopicClusterActive] = useState<number>(0);

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
    <section id="journey" className="py-24 bg-[#141824] relative overflow-hidden text-[#F5F0E8]">
      {/* Background Decorative Data River */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4A853]/10 via-[#141824]/90 to-[#0B0E14] pointer-events-none" />
      <div className="absolute inset-0 data-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
            Engineering <span className="text-[#D4A853]">Journey</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300 font-body leading-relaxed">
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
                  ? 'bg-[#2D3447] text-[#D4A853] border-[#D4A853] font-bold shadow-md'
                  : 'bg-[#0B0E14]/80 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
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
                  <div className="w-10 h-10 rounded-2xl bg-[#0B0E14] border-2 border-[#D4A853] flex items-center justify-center shadow-lg shadow-[#D4A853]/20 text-[#D4A853]">
                    {step.icon}
                  </div>
                </div>

                {/* Full-Width Milestone Card (Fills 100% space) */}
                <div className="w-full pl-14 sm:pl-20">
                  <div className="bg-[#0B0E14] border border-gray-800 hover:border-[#D4A853]/60 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4A853]/10 group">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800/80 pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#D4A853] text-[#1A1F2E]">
                          {step.year}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/30">
                          {step.period}
                        </span>
                        {step.isLatest && (
                          <span className="text-[10px] font-mono bg-emerald-500 text-black font-bold px-2 py-0.5 rounded">
                            CURRENT ROLE
                          </span>
                        )}
                        <span className="text-xs font-mono text-gray-400 bg-[#1A1F2E] px-2.5 py-0.5 rounded border border-gray-800">
                          {step.badge}
                        </span>
                      </div>

                      <span className="text-xs font-mono text-gray-400">
                        {step.institution}
                      </span>
                    </div>

                    {/* Main Card Grid: 7 cols details, 5 cols interactive simulator */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                      {/* Left Column (7 cols): Content & Key Deliverables */}
                      <div className="lg:col-span-7 space-y-4">
                        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#F5F0E8] group-hover:text-[#D4A853] transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-amber-200 font-display font-medium leading-relaxed bg-[#1A1F2E]/60 p-3.5 rounded-xl border-l-4 border-[#D4A853]">
                          &ldquo;{step.shortDesc}&rdquo;
                        </p>

                        <p className="text-xs sm:text-sm text-gray-300 font-body leading-relaxed">
                          {step.detail}
                        </p>

                        {/* Deliverables */}
                        <div>
                          <h4 className="font-mono text-xs text-[#D4A853] uppercase tracking-wider font-bold mb-2 flex items-center">
                            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                            Key Outcomes &amp; Accomplishments:
                          </h4>
                          <ul className="space-y-2">
                            {step.highlights.map((item, hIdx) => (
                              <li key={hIdx} className="flex items-start space-x-2 text-xs text-gray-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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

                      {/* Right Column (5 cols): Embedded Live Demonstration Studio */}
                      <div className="lg:col-span-5 bg-[#141824] border border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-inner">
                        {/* Simulator 1: ADX & KQL Telemetry Engine (2026) */}
                        {step.hasKqlSim && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                              <span className="font-mono text-xs font-bold text-[#D4A853] flex items-center">
                                <Terminal className="w-4 h-4 mr-1.5 text-amber-400" />
                                ADX KQL Telemetry Engine
                              </span>
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                                LIVE KQL
                              </span>
                            </div>

                            <p className="text-xs text-gray-300 font-mono">
                              Execute KQL query on Azure Data Explorer Gold layer:
                            </p>

                            <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800 font-mono text-xs">
                              <textarea
                                value={kqlQueryText}
                                onChange={(e) => setKqlQueryText(e.target.value)}
                                className="w-full bg-transparent text-emerald-300 outline-none resize-none font-mono text-xs h-16"
                              />
                            </div>

                            <button
                              onClick={() => {
                                setKqlExecuted(true);
                                addLog('KQL_EXEC', 'KQL Query Executed in Journey Simulator', kqlQueryText);
                              }}
                              className="w-full py-2 bg-[#D4A853] hover:bg-[#E8C878] text-[#1A1F2E] font-mono font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5 shadow"
                            >
                              <Terminal className="w-4 h-4" />
                              <span>Run KQL Query on ADX Gold Layer</span>
                            </button>

                            {kqlExecuted && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-[#0B0E14] rounded-xl border border-emerald-500/40 text-[11px] font-mono text-emerald-300 space-y-1.5"
                              >
                                <p className="font-bold text-emerald-400">⚡ 200 OK — Query Executed in 14ms</p>
                                <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-300">
                                  <div className="bg-[#1A1F2E] p-1.5 rounded">
                                    <span className="text-gray-400 block">AvgLatency:</span>
                                    <strong className="text-amber-300">12.4ms</strong>
                                  </div>
                                  <div className="bg-[#1A1F2E] p-1.5 rounded">
                                    <span className="text-gray-400 block">Status:</span>
                                    <strong className="text-amber-300">Materialized Active</strong>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )}

                        {/* Simulator 2: Dynamic FastAPI Generator (2025) */}
                        {step.hasFastApiSim && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                              <span className="font-mono text-xs font-bold text-emerald-400 flex items-center">
                                <Zap className="w-4 h-4 mr-1.5" />
                                Dynamic FastAPI Generator
                              </span>
                              <span className="text-[10px] font-mono text-emerald-400">60% Dev Cut</span>
                            </div>

                            <p className="text-xs text-gray-300 font-mono">
                              Select database table schema to auto-generate REST endpoint:
                            </p>

                            <select
                              value={fastApiSchema}
                              onChange={(e) => {
                                setFastApiSchema(e.target.value);
                                setFastApiGenerated(false);
                              }}
                              className="w-full bg-[#0B0E14] border border-gray-700 text-xs font-mono text-[#D4A853] p-2.5 rounded-xl outline-none focus:border-[#D4A853]"
                            >
                              <option value="user_telemetry_logs">Table: user_telemetry_logs</option>
                              <option value="enterprise_orders">Table: enterprise_orders</option>
                              <option value="iot_sensor_readings">Table: iot_sensor_readings</option>
                            </select>

                            <button
                              onClick={() => setFastApiGenerated(true)}
                              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5 shadow"
                            >
                              <Code2 className="w-4 h-4" />
                              <span>Generate OpenAPI Route</span>
                            </button>

                            {fastApiGenerated && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-[#0B0E14] rounded-xl border border-emerald-500/40 text-[11px] font-mono text-emerald-300 space-y-1"
                              >
                                <p className="font-bold text-emerald-400">✅ Route Created in 2 milliseconds!</p>
                                <p className="text-gray-300">Endpoint: <span className="text-amber-300">GET /api/v1/{fastApiSchema}</span></p>
                                <p className="text-gray-400 text-[10px]">Pydantic schema validated • Swagger docs built</p>
                              </motion.div>
                            )}
                          </div>
                        )}

                        {/* Simulator 3: AWS Document Parser Simulator (2024) */}
                        {step.hasAwsParserSim && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                              <span className="font-mono text-xs font-bold text-purple-400 flex items-center">
                                <FileCode className="w-4 h-4 mr-1.5" />
                                AWS Step Functions + Textract
                              </span>
                              <span className="text-[10px] font-mono text-[#D4A853]">80%+ Precision</span>
                            </div>

                            <p className="text-xs text-gray-300 font-mono">
                              Simulate serverless OCR extraction on multi-page PDF:
                            </p>

                            <div className="p-3 bg-[#0B0E14] border border-dashed border-gray-700 rounded-xl text-center">
                              <p className="text-xs text-gray-300 font-mono">Input PDF: <span className="text-amber-300 font-bold">Stakeholder_Document.pdf</span></p>
                            </div>

                            <button
                              onClick={() => {
                                setParsingPdf(true);
                                setParsedConfidence(null);
                                setTimeout(() => {
                                  setParsingPdf(false);
                                  setParsedConfidence(88.6);
                                }, 800);
                              }}
                              disabled={parsingPdf}
                              className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2 shadow"
                            >
                              {parsingPdf ? (
                                <span>Running Step Functions State Machine...</span>
                              ) : (
                                <>
                                  <BrainCircuit className="w-4 h-4" />
                                  <span>Run Textract &amp; Comprehend Pipeline</span>
                                </>
                              )}
                            </button>

                            {parsedConfidence && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-3 bg-[#0B0E14] border border-purple-500/40 rounded-xl text-[11px] font-mono text-purple-200 space-y-1"
                              >
                                <p className="text-purple-300 font-bold">🎯 Precision: {parsedConfidence}%</p>
                                <p className="text-gray-300">Extracted: 22 Key-Value Pairs, 4 Tables</p>
                                <p className="text-emerald-400">AWS A2I Human Loop: Passed</p>
                              </motion.div>
                            )}
                          </div>
                        )}

                        {/* Simulator 4: Ingestion Engine (2023) */}
                        {step.hasIngestSim && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                              <span className="font-mono text-xs font-bold text-cyan-400 flex items-center">
                                <Search className="w-4 h-4 mr-1.5" />
                                pdfplumber &amp; BeautifulSoup
                              </span>
                              <span className="text-[10px] font-mono text-cyan-300">PostgreSQL Full-Text</span>
                            </div>

                            <p className="text-xs text-gray-300 font-mono">
                              Simulate web &amp; PDF document stream ingestion:
                            </p>

                            <button
                              onClick={() => {
                                setIngestPdfParsing(true);
                                setIngestPdfDone(false);
                                setTimeout(() => {
                                  setIngestPdfParsing(false);
                                  setIngestPdfDone(true);
                                }, 700);
                              }}
                              disabled={ingestPdfParsing}
                              className="w-full py-2 bg-cyan-700 hover:bg-cyan-600 disabled:opacity-50 text-white font-mono font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2 shadow"
                            >
                              {ingestPdfParsing ? (
                                <span>Ingesting web pages &amp; PDFs...</span>
                              ) : (
                                <>
                                  <Globe className="w-4 h-4" />
                                  <span>Parse Document &amp; Stream to Postgres</span>
                                </>
                              )}
                            </button>

                            {ingestPdfDone && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-3 bg-[#0B0E14] border border-cyan-500/40 rounded-xl text-[11px] font-mono text-cyan-200 space-y-1"
                              >
                                <p className="text-cyan-300 font-bold">⚡ Ingest Complete (&lt;50ms Query Latency)</p>
                                <p className="text-gray-300">Structured tables indexed into PostgreSQL</p>
                                <p className="text-emerald-400">Full-Text GIN Index Updated</p>
                              </motion.div>
                            )}
                          </div>
                        )}

                        {/* Simulator 5: Topic Modeling Simulator (2022) */}
                        {step.hasTopicSim && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                              <span className="font-mono text-xs font-bold text-rose-400 flex items-center">
                                <BrainCircuit className="w-4 h-4 mr-1.5" />
                                Gensim LDA Topic Clusters
                              </span>
                              <span className="text-[10px] font-mono text-rose-400">Unsupervised ML</span>
                            </div>

                            <p className="text-xs text-gray-300 font-mono">
                              Click semantic clusters to inspect LDA topics:
                            </p>

                            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                              {[
                                { name: 'Topic 1: Telemetry', terms: 'latency, adx, stream, cdc' },
                                { name: 'Topic 2: Document AI', terms: 'textract, pdf, ocr, step' },
                                { name: 'Topic 3: API Framework', terms: 'fastapi, pydantic, route' },
                              ].map((t, tIdx) => (
                                <button
                                  key={tIdx}
                                  onClick={() => setTopicClusterActive(tIdx)}
                                  className={`p-2 rounded-xl text-left border transition ${
                                    topicClusterActive === tIdx
                                      ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                                      : 'bg-[#0B0E14] border-gray-800 text-gray-400 hover:text-white'
                                  }`}
                                >
                                  <span className="font-bold block text-[10px]">{t.name}</span>
                                </button>
                              ))}
                            </div>

                            <div className="p-3 bg-[#0B0E14] rounded-xl border border-rose-500/30 text-[11px] font-mono text-rose-300">
                              <span className="text-gray-400 block text-[10px]">SpaCy Lemmatized Keywords:</span>
                              <strong className="text-amber-300">
                                {topicClusterActive === 0 && 'latency (0.34) • adx (0.28) • stream (0.21) • cdc (0.17)'}
                                {topicClusterActive === 1 && 'textract (0.42) • pdf (0.31) • ocr (0.18) • step (0.09)'}
                                {topicClusterActive === 2 && 'fastapi (0.38) • pydantic (0.33) • route (0.19) • schema (0.10)'}
                              </strong>
                            </div>
                          </div>
                        )}

                        {/* Career / Education Graphic Cards */}
                        {step.isCareerCard && (
                          <div className="flex flex-col items-center justify-center h-full p-4 text-center space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                              <Briefcase className="w-6 h-6" />
                            </div>
                            <p className="font-display font-bold text-base text-[#F5F0E8]">
                              TCS Cloud Engineering
                            </p>
                            <p className="font-mono text-xs text-gray-400 max-w-xs">
                              Architecting enterprise-scale data infrastructure across Azure and AWS.
                            </p>
                          </div>
                        )}

                        {step.isEduCard && (
                          <div className="flex flex-col items-center justify-center h-full p-4 text-center space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg">
                              <GraduationCap className="w-6 h-6" />
                            </div>
                            <p className="font-display font-bold text-base text-[#F5F0E8]">
                              Academic Distinction
                            </p>
                            <p className="font-mono text-xs text-gray-400 max-w-xs">
                              Honors in Computer Science • Core Foundations in Distributed Systems &amp; Relational SQL.
                            </p>
                          </div>
                        )}
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
