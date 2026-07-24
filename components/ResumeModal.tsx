'use client';

import React, { useState } from 'react';
import { X, Printer, Download, Mail, Phone, Linkedin, Check, FileText, ExternalLink } from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { addLog } = useSystemLog();

  if (!isOpen) return null;

  const handlePrint = () => {
    addLog('AUDIT_LOG', 'Print / PDF Download Action Triggered', 'Sooraj Krishnan V S Resume');
    window.print();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('soorajkrishnanvs@gmail.com');
    setCopiedEmail(true);
    addLog('AUDIT_LOG', 'Email Copied from Resume Modal', 'soorajkrishnanvs@gmail.com');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white text-[#1A1F2E] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Control Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1A1F2E] text-[#F5F0E8] border-b border-[#D4A853]/30 shrink-0">
          <div className="flex items-center space-x-2 font-display font-bold text-sm sm:text-base">
            <FileText className="w-5 h-5 text-[#D4A853]" />
            <span>Sooraj Krishnan V S — Curriculum Vitae</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#2D3447] hover:bg-[#D4A853] text-[#F5F0E8] hover:text-[#1A1F2E] font-mono text-xs flex items-center space-x-1.5 transition"
              title="Print Resume"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="p-6 sm:p-10 overflow-y-auto font-body text-sm leading-relaxed space-y-6 text-gray-800 bg-[#F5F0E8]">
          {/* Resume Header */}
          <div className="text-center border-b border-gray-300 pb-6 space-y-2">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#1A1F2E] tracking-tight">
              Sooraj Krishnan V S
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm font-mono text-gray-700">
              <span className="flex items-center">
                <Phone className="w-3.5 h-3.5 mr-1 text-[#C75B3F]" /> +91 6282363736
              </span>
              <span>|</span>
              <button
                onClick={copyEmail}
                className="flex items-center hover:text-[#C75B3F] transition font-semibold"
              >
                <Mail className="w-3.5 h-3.5 mr-1 text-[#C75B3F]" />
                soorajkrishnanvs@gmail.com
                {copiedEmail && <span className="ml-1 text-emerald-600 font-bold">(Copied!)</span>}
              </button>
              <span>|</span>
              <a
                href="https://linkedin.com/in/soorajkrishnanvs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center hover:text-[#C75B3F] transition font-semibold"
              >
                <Linkedin className="w-3.5 h-3.5 mr-1 text-[#C75B3F]" />
                linkedin.com/in/soorajkrishnanvs
              </a>
            </div>
          </div>

          {/* SUMMARY Section */}
          <div>
            <h2 className="font-display font-bold text-sm text-[#1A1F2E] uppercase tracking-wider border-b-2 border-[#1A1F2E] pb-1 mb-2">
              SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Data Engineer with 4 years of hands-on experience architecting end-to-end ETL/ELT data pipelines and automating complex workflows across Azure. Proficient in Azure Data Explorer pipeline design, Spark-based processing, and data lakehouse implementation using Medallion architecture. Delivered a 60% reduction in API development time through intelligent automation frameworks, following Agile development practices. Databricks certified, with experience in real time ingestion, data warehousing, cloud-native infrastructure, and scalable system design. Experienced in version control workflows and building REST APIs for scalable data delivery.
            </p>
          </div>

          {/* EXPERIENCE Section */}
          <div>
            <h2 className="font-display font-bold text-sm text-[#1A1F2E] uppercase tracking-wider border-b-2 border-[#1A1F2E] pb-1 mb-3">
              EXPERIENCE
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline font-display font-bold text-sm text-[#1A1F2E]">
                <span>Tata Consultancy Services</span>
                <span className="font-mono text-xs font-normal text-gray-600">Kochi, India</span>
              </div>
              <div className="flex justify-between items-baseline font-mono text-xs text-gray-700 italic font-semibold">
                <span>Cloud Data Engineer</span>
                <span>August 2021 – Present</span>
              </div>

              <ul className="list-disc pl-5 text-xs sm:text-sm text-gray-700 space-y-1.5">
                <li>
                  Built data pipelines using Azure Event Hubs and Debezium to set up a Medallion Architecture in Azure Data Explorer, giving the team real-time visibility into system health via Azure Data Explorer and Grafana dashboards.
                </li>
                <li>
                  Developed a dynamic API generator using FastAPI and Pydantic that automated the creation of standard REST APIS(GET), cutting development time down from 5 days to 2 days.
                </li>
                <li>
                  Led the development of an AWS-based document parser using Step Functions, Textract, Comprehend, and Augmented AI(A2I), which reached 80%+ precision in identifying key data within complex PDF layouts.
                </li>
                <li>
                  Developed an automated data ingestion system using BeautifulSoup and pdfplumber to parse unstructured stakeholder data into PostgreSQL, replacing manual research with a near-instant search platform.
                </li>
                <li>
                  Created a topic modeling system using Unsupervised Machine Learning and Semantic Analysis to process large-scale text datasets, delivering automated trend reports and interactive visualizations for stakeholders.
                </li>
              </ul>
            </div>
          </div>

          {/* EDUCATION Section */}
          <div>
            <h2 className="font-display font-bold text-sm text-[#1A1F2E] uppercase tracking-wider border-b-2 border-[#1A1F2E] pb-1 mb-3">
              EDUCATION
            </h2>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline font-display font-bold text-[#1A1F2E]">
                <span>Master of Science in Computer Science</span>
                <span className="font-mono text-xs font-normal">2021</span>
              </div>
              <div className="flex justify-between items-baseline italic text-gray-600">
                <span>Mahatma Gandhi University</span>
                <span className="font-mono text-xs font-normal">Kottayam, India</span>
              </div>

              <div className="flex justify-between items-baseline font-display font-bold text-[#1A1F2E] pt-2">
                <span>Bachelor of Science in Computer Science</span>
                <span className="font-mono text-xs font-normal">2019</span>
              </div>
              <div className="flex justify-between items-baseline italic text-gray-600">
                <span>Mahatma Gandhi University</span>
                <span className="font-mono text-xs font-normal">Kottayam, India</span>
              </div>
            </div>
          </div>

          {/* SKILLS Section */}
          <div>
            <h2 className="font-display font-bold text-sm text-[#1A1F2E] uppercase tracking-wider border-b-2 border-[#1A1F2E] pb-1 mb-3">
              SKILLS
            </h2>

            <div className="grid grid-cols-1 gap-1.5 text-xs sm:text-sm">
              <p>
                <strong className="font-semibold text-[#1A1F2E]">Programming:</strong> Python, SQL, KQL
              </p>
              <p>
                <strong className="font-semibold text-[#1A1F2E]">Data Engineering:</strong> Data Pipeline Development, Medallion Architecture, Batch &amp; Stream Processing
              </p>
              <p>
                <strong className="font-semibold text-[#1A1F2E]">Big Data Technologies:</strong> Apache Spark, Databricks, Azure Data Explorer
              </p>
              <p>
                <strong className="font-semibold text-[#1A1F2E]">Cloud Platforms:</strong> Microsoft Azure (Event Hub, Data Explorer), AWS (Step Functions, Textract, Comprehend, A2I)
              </p>
              <p>
                <strong className="font-semibold text-[#1A1F2E]">Infrastructure &amp; DevOps:</strong> Terraform, Bicep, CI/CD, Git
              </p>
              <p>
                <strong className="font-semibold text-[#1A1F2E]">Machine Learning &amp; AI:</strong> NLP, Topic Modeling, Named Entity Recognition (NER), Generative AI
              </p>
              <p>
                <strong className="font-semibold text-[#1A1F2E]">Frameworks &amp; Libraries:</strong> FastAPI, Flask, Pandas, Gensim, SpaCy
              </p>
            </div>
          </div>

          {/* CERTIFICATIONS Section */}
          <div>
            <h2 className="font-display font-bold text-sm text-[#1A1F2E] uppercase tracking-wider border-b-2 border-[#1A1F2E] pb-1 mb-3">
              CERTIFICATIONS
            </h2>

            <div className="space-y-1.5 text-xs sm:text-sm font-body">
              <div className="flex justify-between items-baseline">
                <span>
                  <strong className="text-[#1A1F2E]">Databricks Certified Data Engineer Associate</strong> | <em>Databricks</em>
                </span>
                <span className="font-mono text-xs">2026</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>
                  <strong className="text-[#1A1F2E]">AWS Certified AI Practitioner</strong> | <em>Amazon Web Services</em>
                </span>
                <span className="font-mono text-xs">2026</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>
                  <strong className="text-[#1A1F2E]">Microsoft Certified: Azure AI Fundamentals</strong> | <em>Microsoft</em>
                </span>
                <span className="font-mono text-xs">2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#1A1F2E] border-t border-[#D4A853]/30 flex items-center justify-between text-xs font-mono text-gray-400 shrink-0">
          <span>Sooraj Krishnan V S Resume</span>
          <button
            onClick={copyEmail}
            className="text-[#D4A853] hover:underline"
          >
            Contact: soorajkrishnanvs@gmail.com
          </button>
        </div>
      </div>
    </div>
  );
}
