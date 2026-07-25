'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Send, Copy, Check, Terminal } from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    pipelineType: 'Medallion Architecture (ADX/Lakehouse)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { addLog } = useSystemLog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    addLog('DATA_ACTION', `Inquiry Dispatched from ${formData.name}`, `Pipeline Scope: ${formData.pipelineType}`);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('soorajkrishnanvs@gmail.com');
    setCopiedEmail(true);
    addLog('AUDIT_LOG', 'Email Copied to Clipboard', 'soorajkrishnanvs@gmail.com');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-[#F8F6F0] dark:bg-[#0F1419] relative text-[#1A1F2E] dark:text-[#F5F0E8] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4A853]/20 border border-[#B3822A]/30 dark:border-[#D4A853]/30 text-xs font-mono text-[#B3822A] dark:text-[#D4A853] mb-3">
                <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#1A1F2E] dark:text-[#F5F0E8] tracking-tight">
                Let&apos;s Build <span className="text-[#B3822A] dark:text-[#D4A853]">Scalable Data Pipelines</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Whether you need a Medallion Lakehouse on Azure Data Explorer, dynamic FastAPI automation, or serverless AWS document parsing — I&apos;m open for strategic cloud data engineering roles and advisory.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4 font-mono text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-800 flex items-center justify-between shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-[#0F1419] border border-gray-200 dark:border-gray-700 text-[#B3822A] dark:text-[#D4A853]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-[11px] block font-semibold">DIRECT EMAIL</span>
                    <span className="text-[#1A1F2E] dark:text-white font-bold">soorajkrishnanvs@gmail.com</span>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-[#2D3447] hover:bg-[#D4A853] text-[#1A1F2E] dark:text-[#F5F0E8] hover:text-[#1A1F2E] transition border border-gray-200 dark:border-transparent"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href="https://linkedin.com/in/soorajkrishnanvs"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-800 flex items-center space-x-3 hover:border-[#B3822A]/60 dark:hover:border-[#D4A853]/60 transition block shadow-sm dark:shadow-none"
              >
                <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-[#0F1419] border border-gray-200 dark:border-gray-700 text-sky-600 dark:text-sky-400">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-[11px] block font-semibold">LINKEDIN PROFILE</span>
                  <span className="text-[#1A1F2E] dark:text-white font-bold">linkedin.com/in/soorajkrishnanvs</span>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-800 flex items-center space-x-3 shadow-sm dark:shadow-none">
                <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-[#0F1419] border border-gray-200 dark:border-gray-700 text-emerald-600 dark:text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-[11px] block font-semibold">PHONE (INDIA)</span>
                  <span className="text-[#1A1F2E] dark:text-white font-bold">+91 6282363736</span>
                </div>
              </div>
            </div>

            {/* Availability Pill */}
            <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 flex items-center space-x-3">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="text-xs font-mono text-emerald-900 dark:text-emerald-200">
                <strong>Current Status:</strong> Open to Cloud Data Engineer Opportunities &amp; Architecture Consulting.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Pipeline Request Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl dark:shadow-2xl relative">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
              <h3 className="font-display font-bold text-xl text-[#1A1F2E] dark:text-[#F5F0E8] flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-[#B3822A] dark:text-[#D4A853]" />
                Send a Message to Sooraj
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                Fill out the data pipeline diagnostic form below:
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-emerald-50 dark:bg-[#0F1419] border border-emerald-300 dark:border-emerald-500/50 rounded-xl text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-500 mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-2xl text-[#1A1F2E] dark:text-white">Message Transmitted!</h4>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-body max-w-md mx-auto">
                  Thank you, <strong className="text-[#B3822A] dark:text-[#D4A853]">{formData.name}</strong>. Sooraj will review your inquiry and respond to <span className="text-emerald-700 dark:text-emerald-400">{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-[#2D3447] hover:bg-gray-300 dark:hover:bg-gray-700 text-xs font-mono text-gray-800 dark:text-gray-200 rounded-lg transition"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-600 dark:text-gray-400 uppercase mb-1 font-semibold">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-gray-50 dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1A1F2E] dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#B3822A] dark:focus:border-[#D4A853] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-600 dark:text-gray-400 uppercase mb-1 font-semibold">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@company.com"
                      className="w-full bg-gray-50 dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1A1F2E] dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#B3822A] dark:focus:border-[#D4A853] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-600 dark:text-gray-400 uppercase mb-1 font-semibold">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Tech Corp"
                      className="w-full bg-gray-50 dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1A1F2E] dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#B3822A] dark:focus:border-[#D4A853] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-600 dark:text-gray-400 uppercase mb-1 font-semibold">
                      Primary Pipeline Requirement
                    </label>
                    <select
                      value={formData.pipelineType}
                      onChange={(e) => setFormData({ ...formData, pipelineType: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#1A1F2E] dark:text-white focus:outline-none focus:border-[#B3822A] dark:focus:border-[#D4A853] transition font-mono"
                    >
                      <option value="Medallion Architecture (ADX/Lakehouse)">Medallion Lakehouse (Azure Event Hubs / ADX)</option>
                      <option value="FastAPI REST Automation">FastAPI & Pydantic Microservice Automation</option>
                      <option value="AWS Step Functions & Textract OCR">AWS Textract Document Parsing (Step Functions)</option>
                      <option value="Unsupervised ML & Topic Modeling">Unsupervised Topic Modeling & NLP</option>
                      <option value="General Engineering Opportunity">General Data Engineering Role / Hiring</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-600 dark:text-gray-400 uppercase mb-1 font-semibold">
                    Project / Inquiry Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your data pipeline goals, scaling challenges, or team requirements..."
                    className="w-full bg-gray-50 dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1A1F2E] dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#B3822A] dark:focus:border-[#D4A853] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4A853] hover:bg-[#E8C878] text-[#1A1F2E] font-display font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Pipeline Request to Sooraj</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
