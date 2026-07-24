'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  Code2,
  FileText,
  Search,
  Brain,
  Layers,
  BarChart3,
  CheckCircle2,
  Cpu,
  Server,
  Database,
} from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';

interface Project {
  id: string;
  category: string;
  title: string;
  impact: string;
  summary: string;
  architecture: {
    source: string;
    ingestion: string;
    transformation: string;
    storage: string;
    analytics: string;
  };
  metrics: { label: string; value: string }[];
  stack: string[];
  icon: any;
  highlightCode: {
    language: string;
    code: string;
  };
}

export default function PipelineCaseStudies() {
  const [activeProject, setActiveProject] = useState('medallion');
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'code'>('overview');
  const { addLog } = useSystemLog();

  const projects: Project[] = [
    {
      id: 'medallion',
      category: 'Real-time Event Streaming',
      title: 'Azure Event Hubs & ADX Medallion Architecture',
      impact: 'Real-time System Health & <100ms Latency',
      summary:
        'Engineered an end-to-end streaming data pipeline using Debezium CDC, Azure Event Hubs, and Azure Data Explorer (ADX) to establish a Bronze-Silver-Gold Medallion Lakehouse.',
      architecture: {
        source: 'Transactional OLTP Databases (SQL Server / PostgreSQL)',
        ingestion: 'Debezium Change Data Capture (CDC) + Azure Event Hubs',
        transformation: 'PySpark / ADX Update Policies (Deduplication & Validation)',
        storage: 'Azure Data Explorer (ADX) Delta Lakehouse',
        analytics: 'Grafana Real-time Health Dashboards & Materialized Views',
      },
      metrics: [
        { label: 'Ingestion Speed', value: '2.4M msgs/sec' },
        { label: 'Dashboard Latency', value: '< 100ms' },
        { label: 'Uptime Visibility', value: '100% Real-time' },
      ],
      stack: ['Azure Event Hubs', 'Debezium', 'ADX', 'KQL', 'PySpark', 'Grafana', 'Delta Lake'],
      icon: Zap,
      highlightCode: {
        language: 'sql',
        code: `-- ADX Silver Layer Update Policy Function
.create-or-alter function TransformRawCDC() {
    BronzeEventStream
    | where Timestamp > ago(5m)
    | extend ParsedJson = parse_json(Payload)
    | project 
        EventId = tostring(ParsedJson.id),
        EventTime = todatetime(ParsedJson.timestamp),
        SystemHealth = tostring(ParsedJson.status),
        LatencyMs = tolong(ParsedJson.latency_ms)
    | where isnotempty(EventId)
}`,
      },
    },
    {
      id: 'fastapi',
      category: 'API Automation Framework',
      title: 'Dynamic REST API Generator (FastAPI + Pydantic)',
      impact: '60% Reduction in API Dev Cycle (5 Days ➔ 2 Days)',
      summary:
        'Developed an automated API generation framework using FastAPI and Pydantic that dynamically constructs validated REST APIs from database schemas.',
      architecture: {
        source: 'Relational Database Schemas (PostgreSQL / Azure SQL)',
        ingestion: 'Introspective Schema Parser & Metadata Inspector',
        transformation: 'Dynamic Pydantic Model Creation & OpenAPI Schema Generation',
        storage: 'Async Database Connection Pool (AsyncPG / SQLAlchemy)',
        analytics: 'FastAPI Dynamic GET Endpoints with Caching Layer',
      },
      metrics: [
        { label: 'Development Cycle', value: '5 Days ➔ 2 Days' },
        { label: 'Time Reduction', value: '60% Cut' },
        { label: 'Type Safety', value: 'Pydantic Runtime' },
      ],
      stack: ['FastAPI', 'Pydantic', 'Python', 'PostgreSQL', 'AsyncIO', 'OpenAPI', 'Docker'],
      icon: Code2,
      highlightCode: {
        language: 'python',
        code: `from fastapi import FastAPI
from pydantic import create_model

app = FastAPI(title="Dynamic API Framework")

def register_dynamic_routes(table_name: str, fields: dict):
    # Auto-generates Pydantic schema dynamically
    ModelClass = create_model(f"{table_name}_model", **fields)
    
    @app.get(f"/api/v1/{table_name}", response_model=list[ModelClass])
    async def dynamic_get(limit: int = 100):
        # Queries DB asynchronously with auto-generated GET routes
        return await db_connector.fetch_all(table_name, limit)
`,
      },
    },
    {
      id: 'document-ai',
      category: 'Intelligent Document Processing',
      title: 'AWS Step Functions & Textract Document Parser',
      impact: '80%+ Precision on Complex PDF Form Layouts',
      summary:
        'Led the development of an AWS cloud-native document parsing platform using Step Functions, Textract, Comprehend NLP, and Augmented AI (A2I) human review loops.',
      architecture: {
        source: 'Unstructured Stakeholder PDF Layouts & Scanned Documents',
        ingestion: 'AWS S3 Bucket Notification Triggers',
        transformation: 'AWS Step Functions Orchestration + AWS Textract Layout Analysis',
        storage: 'AWS Comprehend NLP Named Entity Extraction + PostgreSQL',
        analytics: 'AWS A2I Human Review Portal for Low-Confidence Fields',
      },
      metrics: [
        { label: 'Parsing Precision', value: '80%+' },
        { label: 'Workflow Automation', value: 'AWS Step Functions' },
        { label: 'Layout Types', value: 'Tables, Forms, Key-Value' },
      ],
      stack: ['AWS Step Functions', 'AWS Textract', 'AWS Comprehend', 'AWS A2I', 'AWS S3', 'Python'],
      icon: FileText,
      highlightCode: {
        language: 'json',
        code: `{
  "Comment": "AWS Step Functions PDF Parsing Workflow",
  "StartAt": "ExtractTextractBlocks",
  "States": {
    "ExtractTextractBlocks": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Next": "AnalyzeConfidenceScore"
    },
    "AnalyzeConfidenceScore": {
      "Type": "Choice",
      "Choices": [
        { "Variable": "$.confidence", "NumericGreaterThanEquals": 0.8, "Next": "SaveToPostgreSQL" }
      ],
      "Default": "TriggerAWS_A2I_HumanLoop"
    }
  }
}`,
      },
    },
    {
      id: 'web-scraper',
      category: 'Automated Ingestion Engine',
      title: 'BeautifulSoup & pdfplumber PostgreSQL Ingestion',
      impact: 'Instant Search Platform Replacing Manual Research',
      summary:
        'Built an automated data ingestion platform using BeautifulSoup and pdfplumber to extract unstructured stakeholder data into indexed PostgreSQL databases.',
      architecture: {
        source: 'Unstructured Web Pages & Multi-page PDF Reports',
        ingestion: 'BeautifulSoup HTML Scraper + pdfplumber Extraction Engine',
        transformation: 'Data Cleaning, Deduplication & Entity Normalization',
        storage: 'PostgreSQL DB with Full-Text Search Vector Indexes',
        analytics: 'FastAPI Near-Instant Search Portal for Business Users',
      },
      metrics: [
        { label: 'Search Latency', value: '< 50ms' },
        { label: 'Manual Effort Saved', value: '100% Automated' },
      ],
      stack: ['BeautifulSoup', 'pdfplumber', 'PostgreSQL', 'Python', 'FastAPI', 'Pandas'],
      icon: Search,
      highlightCode: {
        language: 'python',
        code: `import pdfplumber
import psycopg2

def extract_pdf_tables_to_postgres(pdf_path: str):
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()
            for table in tables:
                # Clean and insert structured data into PostgreSQL
                insert_structured_rows(table)
`,
      },
    },
    {
      id: 'topic-modeling',
      category: 'Unsupervised ML & NLP',
      title: 'Topic Modeling System with Gensim & SpaCy',
      impact: 'Automated Trend Reports & Semantic Dashboards',
      summary:
        'Engineered a scalable NLP topic modeling pipeline using Latent Dirichlet Allocation (LDA), Gensim, and SpaCy to extract hidden semantic trends from unstructured text.',
      architecture: {
        source: 'Large-scale Unstructured Text Datasets & Stakeholder Logs',
        ingestion: 'Batch Processing Pipeline via Pandas & PySpark',
        transformation: 'SpaCy Lemmatization + Gensim Dictionary & Corpus Vectorization',
        storage: 'LDA Topic Weight Matrices & Coherence Metrics',
        analytics: 'Interactive Trend Visualization Dashboards',
      },
      metrics: [
        { label: 'Model Type', value: 'Unsupervised LDA' },
        { label: 'NLP Framework', value: 'SpaCy & Gensim' },
      ],
      stack: ['Gensim', 'SpaCy', 'Python', 'Pandas', 'PySpark', 'NLP', 'Topic Modeling'],
      icon: Brain,
      highlightCode: {
        language: 'python',
        code: `import spacy
import gensim
from gensim import corpora

nlp = spacy.load("en_core_web_sm")

def train_lda_topic_model(documents: list[str]):
    processed_docs = [[token.lemma_ for token in nlp(doc) if not token.is_stop] for doc in documents]
    dictionary = corpora.Dictionary(processed_docs)
    corpus = [dictionary.doc2bow(doc) for doc in processed_docs]
    
    lda_model = gensim.models.LdaMulticore(corpus=corpus, id2word=dictionary, num_topics=10)
    return lda_model.print_topics()
`,
      },
    },
  ];

  const current = projects.find((p) => p.id === activeProject) || projects[0];
  const IconComponent = current.icon;

  return (
    <section id="pipelines" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/30 text-xs font-mono text-[#E8C878] mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">Engineered Architecture</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
          Data Systems &amp; Pipelines Built by Sooraj
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#94A3B8] font-body">
          In-depth architectural breakdowns of real-time streaming, dynamic API generators, AWS document AI platforms, and ML topic modeling.
        </p>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {projects.map((proj) => {
          const TabIcon = proj.icon;
          const isActive = proj.id === activeProject;

          return (
            <button
              key={proj.id}
              onClick={() => {
                setActiveProject(proj.id);
                addLog('PIPELINE_INSPECT', `Pipeline Case Study Inspected: ${proj.title}`, `Category: ${proj.category}`);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm transition-all shrink-0 ${
                isActive
                  ? 'bg-[#D4A853] text-[#1A1F2E] font-bold shadow-lg scale-105'
                  : 'bg-[#2D3447]/80 text-gray-300 hover:text-white border border-gray-700/80 hover:border-[#D4A853]/40'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{proj.title.split(' ')[0]} {proj.title.split(' ')[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Case Study Card */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#2D3447]/90 backdrop-blur-xl border border-[#D4A853]/30 rounded-2xl p-6 sm:p-10 shadow-2xl"
      >
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-700/60 pb-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-[#0F1419] text-[#D4A853] border border-[#D4A853]/30 shadow-inner">
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#D4A853] uppercase tracking-wider block">
                {current.category}
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F5F0E8]">
                {current.title}
              </h3>
            </div>
          </div>

          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-mono text-xs sm:text-sm font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{current.impact}</span>
          </div>
        </div>

        {/* Inner Subtabs: Overview | Architecture | Code */}
        <div className="flex items-center space-x-2 mb-6 border-b border-gray-800 pb-3 font-mono text-xs">
          {[
            { id: 'overview', label: '📋 System Overview' },
            { id: 'architecture', label: '🏗️ Pipeline Architecture Flow' },
            { id: 'code', label: '💻 Code / Query Implementation' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-[#0F1419] text-[#E8C878] border border-[#D4A853]/40 font-bold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <h4 className="text-sm font-mono text-[#D4A853] uppercase font-semibold">Problem &amp; Engineered Solution</h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-body">
                {current.summary}
              </p>

              <h4 className="text-sm font-mono text-[#D4A853] uppercase font-semibold pt-2">Key Metrics &amp; Business Value</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0F1419] border border-gray-800">
                    <span className="text-xs font-mono text-gray-400 block">{m.label}</span>
                    <strong className="text-xl font-display text-[#E8C878] font-bold mt-1 block">
                      {m.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0F1419] p-5 rounded-xl border border-gray-800 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase mb-3">Technologies Employed</h4>
                <div className="flex flex-wrap gap-2">
                  {current.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[#1A1F2E] text-[#E8C878] border border-[#D4A853]/30 rounded text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800 text-xs font-mono text-gray-400">
                <span className="text-[#D4A853] font-bold block mb-1">Architect: Sooraj Krishnan V S</span>
                <span>Location: TCS Azure / AWS Cloud Environment</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Architecture Diagram */}
        {activeTab === 'architecture' && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-[#D4A853] uppercase font-semibold">
              End-to-End Data Flow Architecture
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
              {[
                { stage: '1. Data Source', val: current.architecture.source, icon: Server },
                { stage: '2. Ingestion', val: current.architecture.ingestion, icon: Zap },
                { stage: '3. Transformation', val: current.architecture.transformation, icon: Cpu },
                { stage: '4. Storage Layer', val: current.architecture.storage, icon: Database },
                { stage: '5. Analytics / UI', val: current.architecture.analytics, icon: BarChart3 },
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#0F1419] border border-gray-800 rounded-xl flex flex-col justify-between relative group hover:border-[#D4A853] transition-colors"
                  >
                    <div className="flex items-center justify-between text-[#D4A853] mb-2">
                      <span className="font-bold text-[11px]">{step.stage}</span>
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <p className="text-gray-300 text-[11px] leading-relaxed">{step.val}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Code Implementation */}
        {activeTab === 'code' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-gray-400 bg-[#0F1419] px-4 py-2 rounded-t-xl border-t border-x border-gray-800">
              <span className="text-[#D4A853] font-bold flex items-center">
                <Code2 className="w-4 h-4 mr-1.5" /> Sample Implementation Snippet
              </span>
              <span className="uppercase text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-300">
                {current.highlightCode.language}
              </span>
            </div>
            <pre className="text-xs font-mono text-emerald-300 bg-[#0F1419] p-4 rounded-b-xl border border-gray-800 overflow-x-auto leading-relaxed">
              <code>{current.highlightCode.code}</code>
            </pre>
          </div>
        )}
      </motion.div>
    </section>
  );
}
