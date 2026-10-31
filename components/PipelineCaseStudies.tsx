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
      category: 'Real-time event streaming',
      title: 'Azure Event Hubs & ADX Medallion Architecture',
      impact: 'Real-time system health & <100ms latency',
      summary:
        'Engineered an end-to-end streaming data pipeline using Debezium CDC, Azure Event Hubs, and Azure Data Explorer (ADX) to establish a Bronze-Silver-Gold Medallion Lakehouse.',
      architecture: {
        source: 'Transactional OLTP databases (SQL Server / PostgreSQL)',
        ingestion: 'Debezium Change Data Capture (CDC) + Azure Event Hubs',
        transformation: 'PySpark / ADX Update Policies (deduplication & validation)',
        storage: 'Azure Data Explorer (ADX) delta lakehouse',
        analytics: 'Grafana real-time health dashboards & materialized views',
      },
      metrics: [
        { label: 'Pipeline model', value: 'Medallion lakehouse' },
        { label: 'Dashboard latency', value: '<100ms' },
        { label: 'Uptime visibility', value: '100% real-time' },
      ],
      stack: ['Azure Event Hubs', 'Debezium', 'ADX', 'KQL', 'PySpark', 'Grafana', 'Delta Lake'],
      icon: Zap,
      highlightCode: {
        language: 'kql',
        code: `// ADX Silver Layer Update Policy Function
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
      category: 'API automation framework',
      title: 'Dynamic REST API Generator (FastAPI + Pydantic)',
      impact: '60% reduction in API dev cycle — 5 days to 2',
      summary:
        'Developed an automated API generation framework using FastAPI and Pydantic that dynamically constructs validated REST APIs from database schemas.',
      architecture: {
        source: 'Relational database schemas (PostgreSQL / Azure SQL)',
        ingestion: 'Introspective schema parser & metadata inspector',
        transformation: 'Dynamic Pydantic model creation & OpenAPI schema generation',
        storage: 'Async database connection pool (AsyncPG / SQLAlchemy)',
        analytics: 'FastAPI dynamic GET endpoints with caching layer',
      },
      metrics: [
        { label: 'Development cycle', value: '5 days → 2 days' },
        { label: 'Time reduction', value: '60%' },
        { label: 'Type safety', value: 'Pydantic runtime' },
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
      category: 'Intelligent document processing',
      title: 'AWS Step Functions & Textract Document Parser',
      impact: '80%+ precision on complex PDF form layouts',
      summary:
        'Led the development of an AWS cloud-native document parsing platform using Step Functions, Textract, Comprehend NLP, and Augmented AI (A2I) human review loops.',
      architecture: {
        source: 'Unstructured stakeholder PDF layouts & scanned documents',
        ingestion: 'AWS S3 bucket notification triggers',
        transformation: 'AWS Step Functions orchestration + Textract layout analysis',
        storage: 'AWS Comprehend NLP named entity extraction + PostgreSQL',
        analytics: 'AWS A2I human review portal for low-confidence fields',
      },
      metrics: [
        { label: 'Parsing precision', value: '80%+' },
        { label: 'Workflow automation', value: 'AWS Step Functions' },
        { label: 'Layout types', value: 'Tables, forms, key-value' },
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
      category: 'Automated ingestion engine',
      title: 'BeautifulSoup & pdfplumber PostgreSQL Ingestion',
      impact: 'Instant search platform replacing manual research',
      summary:
        'Built an automated data ingestion platform using BeautifulSoup and pdfplumber to extract unstructured stakeholder data into indexed PostgreSQL databases.',
      architecture: {
        source: 'Unstructured web pages & multi-page PDF reports',
        ingestion: 'BeautifulSoup HTML scraper + pdfplumber extraction engine',
        transformation: 'Data cleaning, deduplication & entity normalization',
        storage: 'PostgreSQL with full-text search vector indexes',
        analytics: 'FastAPI near-instant search portal for business users',
      },
      metrics: [
        { label: 'Search latency', value: '<50ms' },
        { label: 'Manual effort saved', value: '100% automated' },
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
      impact: 'Automated trend reports & semantic dashboards',
      summary:
        'Engineered a scalable NLP topic modeling pipeline using Latent Dirichlet Allocation (LDA), Gensim, and SpaCy to extract hidden semantic trends from unstructured text.',
      architecture: {
        source: 'Large-scale unstructured text datasets & stakeholder logs',
        ingestion: 'Batch processing pipeline via Pandas & PySpark',
        transformation: 'SpaCy lemmatization + Gensim dictionary & corpus vectorization',
        storage: 'LDA topic weight matrices & coherence metrics',
        analytics: 'Interactive trend visualization dashboards',
      },
      metrics: [
        { label: 'Model type', value: 'Unsupervised LDA' },
        { label: 'NLP framework', value: 'SpaCy & Gensim' },
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
      {/* Header — Pass 5: font-bold, Pass 4: cleaner copy */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#1A1F2E] dark:text-[#F5F0E8] tracking-tight">
          Data systems &amp; pipelines
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-[#94A3B8] font-body">
          Architectural breakdowns of real-time streaming, dynamic API generators, AWS document AI, and ML topic modeling.
        </p>
      </div>

      {/* Project Selector Tabs — Pass 9: no scale, Pass 3: no emoji */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {projects.map((proj) => {
          const TabIcon = proj.icon;
          const isActive = proj.id === activeProject;

          return (
            <button
              key={proj.id}
              onClick={() => {
                setActiveProject(proj.id);
                setActiveTab('overview');
                addLog('PIPELINE_INSPECT', `Pipeline case study: ${proj.title}`, `Category: ${proj.category}`);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xs sm:text-sm transition-colors shrink-0 ${
                isActive
                  ? 'bg-[#D4A853] text-[#1A1F2E] font-medium'
                  : 'bg-white dark:bg-[#2D3447]/80 text-gray-600 dark:text-gray-400 hover:text-[#1A1F2E] dark:hover:text-white border border-gray-200 dark:border-gray-700 hover:border-[#B3822A] dark:hover:border-[#D4A853]/40'
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-[#2D3447]/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl p-6 sm:p-10 shadow-md"
      >
        {/* Card Header — Pass 2: no colored shadow, Pass 5: sentence case category */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700/60 pb-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-[#0F1419] text-[#B3822A] dark:text-[#D4A853] border border-gray-200 dark:border-gray-700">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              {/* Pass 5: sentence case, no uppercase tracking */}
              <span className="text-xs font-mono text-[#B3822A] dark:text-[#D4A853] block">
                {current.category}
              </span>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#1A1F2E] dark:text-[#F5F0E8]">
                {current.title}
              </h3>
            </div>
          </div>

          <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-800 dark:text-emerald-400 font-mono text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{current.impact}</span>
          </div>
        </div>

        {/* Inner Subtabs — Pass 3: no emoji, plain text */}
        <div className="flex items-center space-x-1 mb-6 border-b border-gray-200 dark:border-gray-800 pb-3 font-mono text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'architecture', label: 'Architecture' },
            { id: 'code', label: 'Code' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-100 dark:bg-[#0F1419] text-[#B3822A] dark:text-[#E8C878] border border-gray-200 dark:border-gray-700 font-medium'
                  : 'text-gray-500 dark:text-gray-500 hover:text-[#1A1F2E] dark:hover:text-gray-300'
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
              <h4 className="text-sm font-mono text-[#B3822A] dark:text-[#D4A853] font-medium">Problem & solution</h4>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-body">
                {current.summary}
              </p>

              <h4 className="text-sm font-mono text-[#B3822A] dark:text-[#D4A853] font-medium pt-2">Key metrics</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-gray-50 dark:bg-[#0F1419] border border-gray-200 dark:border-gray-800">
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-500 block">{m.label}</span>
                    <strong className="text-xl font-display font-semibold text-[#B3822A] dark:text-[#E8C878] mt-1 block tabular-nums">
                      {m.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-gray-50 dark:bg-[#0F1419] p-5 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {current.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-[#1A1F2E] text-[#E8C878] border border-gray-800 rounded-md text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800 text-xs font-mono text-gray-500">
                <span className="text-[#D4A853] font-medium block mb-1">Architect: Sooraj Krishnan V S</span>
                <span>TCS Azure / AWS cloud environment</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-[#D4A853] font-medium">
              End-to-end data flow
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
              {[
                { stage: '1. Source', val: current.architecture.source, icon: Server },
                { stage: '2. Ingestion', val: current.architecture.ingestion, icon: Zap },
                { stage: '3. Transform', val: current.architecture.transformation, icon: Cpu },
                { stage: '4. Storage', val: current.architecture.storage, icon: Database },
                { stage: '5. Analytics', val: current.architecture.analytics, icon: BarChart3 },
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 bg-[#0F1419] border border-gray-800 rounded-lg flex flex-col justify-between hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[#D4A853] mb-2">
                      <span className="font-medium text-[11px]">{step.stage}</span>
                      <StepIcon className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-gray-400 text-[11px] leading-relaxed">{step.val}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Code — the second moment: rich terminal block */}
        {activeTab === 'code' && (
          <div className="space-y-0">
            <div className="flex items-center justify-between font-mono text-xs text-gray-500 bg-[#0F1419] px-4 py-2 rounded-t-lg border-t border-x border-gray-800">
              <span className="text-[#D4A853] font-medium flex items-center">
                <Code2 className="w-3.5 h-3.5 mr-1.5" /> Sample snippet
              </span>
              <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400">
                {current.highlightCode.language}
              </span>
            </div>
            <pre className="text-xs font-mono text-emerald-300 bg-[#0F1419] p-5 rounded-b-lg border border-gray-800 overflow-x-auto leading-relaxed">
              <code>{current.highlightCode.code}</code>
            </pre>
          </div>
        )}
      </motion.div>
    </section>
  );
}
