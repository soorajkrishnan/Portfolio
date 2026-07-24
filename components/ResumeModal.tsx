'use client';

import React, { useState } from 'react';
import { X, Printer, Download, Mail, Phone, Linkedin, Check, FileText, FileCode } from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';
import { jsPDF } from 'jspdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { addLog } = useSystemLog();

  if (!isOpen) return null;

  const handlePrint = () => {
    addLog('AUDIT_LOG', 'Print / PDF Dialog Triggered', 'Sooraj Krishnan V S Resume');
    window.print();
  };

  const handleDownloadPDF = () => {
    setIsGeneratingPdf(true);
    addLog('AUDIT_LOG', 'CV PDF Generation Started', 'Sooraj_Krishnan_VS_Resume.pdf');

    setTimeout(() => {
      try {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4',
        });

        const pageWidth = doc.internal.pageSize.getWidth(); // ~595 pt
        const margin = 40;
        const contentWidth = pageWidth - margin * 2;
        let y = 45;

        // Name Header
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(26, 31, 46); // #1A1F2E
        doc.text('SOORAJ KRISHNAN V S', pageWidth / 2, y, { align: 'center' });
        y += 20;

        // Subtitle & Contact
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(180, 130, 40); // Gold
        doc.text('CLOUD DATA ENGINEER', pageWidth / 2, y, { align: 'center' });
        y += 14;

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        doc.text('Kochi, India  |  +91 6282363736  |  soorajkrishnanvs@gmail.com  |  linkedin.com/in/soorajkrishnanvs', pageWidth / 2, y, { align: 'center' });
        y += 18;

        // Gold divider
        doc.setDrawColor(212, 168, 83);
        doc.setLineWidth(1.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 20;

        // Section Title Helper
        const addSectionHeader = (title: string) => {
          if (y > 750) {
            doc.addPage();
            y = 40;
          }
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(26, 31, 46);
          doc.text(title.toUpperCase(), margin, y);
          y += 4;
          doc.setDrawColor(26, 31, 46);
          doc.setLineWidth(0.8);
          doc.line(margin, y, pageWidth - margin, y);
          y += 14;
        };

        // Bullet Helper
        const addBulletItem = (text: string) => {
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(50, 50, 50);
          const lines = doc.splitTextToSize(text, contentWidth - 15);
          if (y + lines.length * 12 > 770) {
            doc.addPage();
            y = 40;
          }
          doc.text('•', margin + 4, y);
          for (let i = 0; i < lines.length; i++) {
            if (y > 770) {
              doc.addPage();
              y = 40;
            }
            doc.text(lines[i], margin + 15, y);
            y += 12;
          }
          y += 2;
        };

        // 1. SUMMARY
        addSectionHeader('Professional Summary');
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        const summaryText = 'Data Engineer with 4 years of hands-on experience architecting end-to-end ETL/ELT data pipelines and automating complex workflows across Azure and AWS. Proficient in Azure Data Explorer pipeline design, Spark-based processing, and Medallion Lakehouse implementation. Delivered a 60% reduction in API development time through intelligent automation frameworks. Databricks certified, with expertise in real-time ingestion, data warehousing, cloud-native infrastructure, and scalable system design.';
        const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
        for (const line of summaryLines) {
          doc.text(line, margin, y);
          y += 12;
        }
        y += 8;

        // 2. EXPERIENCE
        addSectionHeader('Professional Experience');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(26, 31, 46);
        doc.text('Tata Consultancy Services', margin, y);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.text('Kochi, India', pageWidth - margin, y, { align: 'right' });
        y += 12;

        doc.setFont('Helvetica', 'bolditalic');
        doc.setFontSize(9);
        doc.setTextColor(180, 130, 40);
        doc.text('Cloud Data Engineer', margin, y);
        doc.setFont('Helvetica', 'italic');
        doc.setTextColor(100, 100, 100);
        doc.text('August 2021 – Present', pageWidth - margin, y, { align: 'right' });
        y += 14;

        addBulletItem('Architected Medallion Lakehouse pipelines in Azure Data Explorer powered by Azure Event Hubs and Debezium, providing real-time operational telemetry through ADX & Grafana dashboards.');
        addBulletItem('Engineered a dynamic REST API generator utilizing FastAPI and Pydantic, automating standard GET endpoints and cutting development lifecycle from 5 days to 2 days (60% time savings).');
        addBulletItem('Led AWS document intelligence platform development leveraging Step Functions, Textract, Comprehend, and Augmented AI (A2I), achieving 80%+ extraction precision on complex unstructured PDF documents.');
        addBulletItem('Built automated data ingestion pipelines with BeautifulSoup and pdfplumber to convert unstructured stakeholder reports into indexed PostgreSQL databases, replacing manual web research.');
        addBulletItem('Designed topic modeling systems using Unsupervised Machine Learning and Semantic Analysis (Gensim, SpaCy) on large text datasets, automating trend discovery reports and visual dashboards.');
        y += 8;

        // 3. EDUCATION
        addSectionHeader('Education');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(26, 31, 46);
        doc.text('Master of Science in Computer Science', margin, y);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.text('2019 – 2021', pageWidth - margin, y, { align: 'right' });
        y += 12;

        doc.setFont('Helvetica', 'italic');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text('Mahatma Gandhi University, Kottayam, India', margin, y);
        y += 14;

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(26, 31, 46);
        doc.text('Bachelor of Science in Computer Science', margin, y);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.text('2016 – 2019', pageWidth - margin, y, { align: 'right' });
        y += 12;

        doc.setFont('Helvetica', 'italic');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text('Mahatma Gandhi University, Kottayam, India', margin, y);
        y += 18;

        // 4. SKILLS
        addSectionHeader('Technical Skills');
        const skillCategories = [
          ['Programming:', 'Python, SQL, KQL (Kusto Query Language)'],
          ['Data Engineering:', 'ETL/ELT Pipeline Development, Medallion Architecture, Stream & Batch Processing'],
          ['Big Data Platforms:', 'Apache Spark, Databricks, Azure Data Explorer (ADX)'],
          ['Cloud & DevOps:', 'Microsoft Azure (Event Hub, ADX), AWS (Step Functions, Textract, Comprehend), Terraform, Git, CI/CD'],
          ['Frameworks & Libraries:', 'FastAPI, Pydantic, Flask, Pandas, Gensim, SpaCy, BeautifulSoup'],
          ['Databases:', 'PostgreSQL, Azure Data Explorer, Delta Lake, Cosmos DB']
        ];

        for (const [label, val] of skillCategories) {
          if (y > 760) {
            doc.addPage();
            y = 40;
          }
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(26, 31, 46);
          doc.text(label, margin, y);
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(60, 60, 60);
          doc.text(val, margin + 115, y);
          y += 13;
        }
        y += 6;

        // 5. CERTIFICATIONS
        addSectionHeader('Certifications');
        const certList = [
          ['Databricks Certified Data Engineer Associate', 'Databricks', '2026'],
          ['AWS Certified AI Practitioner', 'Amazon Web Services', '2026'],
          ['Microsoft Certified: Azure AI Fundamentals', 'Microsoft', '2024']
        ];

        for (const [title, issuer, year] of certList) {
          if (y > 760) {
            doc.addPage();
            y = 40;
          }
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(26, 31, 46);
          doc.text(title, margin, y);
          doc.setFont('Helvetica', 'italic');
          doc.setTextColor(100, 100, 100);
          doc.text(` | ${issuer}`, margin + doc.getTextWidth(title) * 0.82 + 5, y);
          doc.setFont('Helvetica', 'normal');
          doc.text(year, pageWidth - margin, y, { align: 'right' });
          y += 13;
        }

        doc.save('Sooraj_Krishnan_VS_Resume.pdf');
        addLog('AUDIT_LOG', 'CV PDF Download Completed', 'Sooraj_Krishnan_VS_Resume.pdf');
      } catch (err) {
        console.error('PDF Generation failed', err);
        addLog('AUDIT_LOG', 'PDF Generation Error', String(err));
      } finally {
        setIsGeneratingPdf(false);
      }
    }, 200);
  };

  const handleDownloadText = () => {
    addLog('AUDIT_LOG', 'CV Plain Text Downloaded', 'Sooraj_Krishnan_VS_Resume.txt');
    const textContent = `SOORAJ KRISHNAN V S
Cloud Data Engineer | Kochi, India
Phone: +91 6282363736
Email: soorajkrishnanvs@gmail.com
LinkedIn: https://linkedin.com/in/soorajkrishnanvs

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Data Engineer with 4 years of hands-on experience architecting end-to-end ETL/ELT data pipelines and automating complex workflows across Azure and AWS. Proficient in Azure Data Explorer pipeline design, Spark-based processing, and Medallion Lakehouse implementation. Delivered a 60% reduction in API development time through intelligent automation frameworks. Databricks certified, with expertise in real-time ingestion, data warehousing, cloud-native infrastructure, and scalable system design.

================================================================================
PROFESSIONAL EXPERIENCE
================================================================================
Tata Consultancy Services — Kochi, India
Cloud Data Engineer | August 2021 – Present

- Architected Medallion Lakehouse pipelines in Azure Data Explorer powered by Azure Event Hubs and Debezium, providing real-time operational telemetry through ADX & Grafana dashboards.
- Engineered a dynamic REST API generator utilizing FastAPI and Pydantic, automating standard GET endpoints and cutting development lifecycle from 5 days to 2 days (60% time savings).
- Led AWS document intelligence platform development leveraging Step Functions, Textract, Comprehend, and Augmented AI (A2I), achieving 80%+ extraction precision on complex unstructured PDF documents.
- Built automated data ingestion pipelines with BeautifulSoup and pdfplumber to convert unstructured stakeholder reports into indexed PostgreSQL databases, replacing manual web research.
- Designed topic modeling systems using Unsupervised Machine Learning and Semantic Analysis (Gensim, SpaCy) on large text datasets, automating trend discovery reports and visual dashboards.

================================================================================
EDUCATION
================================================================================
Master of Science in Computer Science (2019 – 2021)
Mahatma Gandhi University, Kottayam, India

Bachelor of Science in Computer Science (2016 – 2019)
Mahatma Gandhi University, Kottayam, India

================================================================================
TECHNICAL SKILLS
================================================================================
Programming: Python, SQL, KQL (Kusto Query Language)
Data Engineering: ETL/ELT Pipeline Development, Medallion Architecture, Stream & Batch Processing
Big Data Platforms: Apache Spark, Databricks, Azure Data Explorer (ADX)
Cloud & DevOps: Microsoft Azure (Event Hub, ADX), AWS (Step Functions, Textract, Comprehend), Terraform, Git, CI/CD
Frameworks & Libraries: FastAPI, Pydantic, Flask, Pandas, Gensim, SpaCy, BeautifulSoup
Database Systems: PostgreSQL, Azure Data Explorer, Delta Lake, Cosmos DB

================================================================================
CERTIFICATIONS
================================================================================
- Databricks Certified Data Engineer Associate (Databricks, 2026)
- AWS Certified AI Practitioner (Amazon Web Services, 2026)
- Microsoft Certified: Azure AI Fundamentals (Microsoft, 2024)
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sooraj_Krishnan_VS_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('soorajkrishnanvs@gmail.com');
    setCopiedEmail(true);
    addLog('AUDIT_LOG', 'Email Copied from Resume Modal', 'soorajkrishnanvs@gmail.com');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div id="printable-resume-wrapper" className="relative w-full max-w-4xl bg-white text-[#1A1F2E] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Control Header bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#1A1F2E] text-[#F5F0E8] border-b border-[#D4A853]/30 shrink-0 gap-3">
          <div className="flex items-center space-x-2 font-display font-bold text-sm sm:text-base">
            <FileText className="w-5 h-5 text-[#D4A853]" />
            <span>Sooraj Krishnan V S — Curriculum Vitae</span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="px-3.5 py-1.5 rounded-lg bg-[#D4A853] hover:bg-[#E8C878] text-[#1A1F2E] font-mono font-bold text-xs flex items-center space-x-1.5 transition shadow disabled:opacity-50"
              title="Download PDF Document"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handleDownloadText}
              className="px-3 py-1.5 rounded-lg bg-[#2D3447] hover:bg-gray-700 text-gray-200 font-mono text-xs flex items-center space-x-1.5 transition border border-gray-700"
              title="Download ATS Plain Text CV"
            >
              <FileCode className="w-3.5 h-3.5 text-[#E8C878]" />
              <span className="hidden sm:inline">Plain Text</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#2D3447] hover:bg-[#D4A853] text-[#F5F0E8] hover:text-[#1A1F2E] font-mono text-xs flex items-center space-x-1.5 transition border border-gray-700"
              title="Print Resume"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div id="printable-resume-content" className="p-6 sm:p-10 overflow-y-auto font-body text-sm leading-relaxed space-y-6 text-gray-800 bg-[#F5F0E8]">
          {/* Resume Header */}
          <div className="text-center border-b border-gray-300 pb-6 space-y-2">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#1A1F2E] tracking-tight">
              Sooraj Krishnan V S
            </h1>
            <div className="text-xs font-mono font-bold text-[#B3822A] uppercase tracking-wider">
              Cloud Data Engineer
            </div>
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
        <div className="px-6 py-3 bg-[#1A1F2E] border-t border-[#D4A853]/30 flex flex-wrap items-center justify-between text-xs font-mono text-gray-400 shrink-0 gap-2">
          <div className="flex items-center space-x-2">
            <span>Sooraj Krishnan V S Resume</span>
            <span className="text-[#D4A853]">•</span>
            <span className="text-emerald-400">PDF &amp; ATS Text Ready</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadPDF}
              className="text-[#D4A853] hover:underline flex items-center space-x-1 font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={copyEmail}
              className="text-gray-300 hover:text-[#D4A853] hover:underline"
            >
              soorajkrishnanvs@gmail.com
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

