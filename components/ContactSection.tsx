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
    addLog('DATA_ACTION', `Inquiry from ${formData.name}`, `Scope: ${formData.pipelineType}`);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('soorajkrishnanvs@gmail.com');
    setCopiedEmail(true);
    addLog('AUDIT_LOG', 'Email copied', 'soorajkrishnanvs@gmail.com');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-[#F8F6F0] dark:bg-[#0F1419] relative text-[#1A1F2E] dark:text-[#F5F0E8] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column — Pass 4: cleaner copy, Pass 5: sentence case */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#1A1F2E] dark:text-[#F5F0E8] tracking-tight">
                Let&apos;s build <span className="text-[#B3822A] dark:text-[#D4A853]">scalable data pipelines</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Whether you need a Medallion Lakehouse on Azure Data Explorer, dynamic FastAPI automation, or serverless AWS document parsing — open to cloud data engineering roles and advisory.
              </p>
            </div>

            {/* Direct Contact Cards — Pass 5: sentence case labels, Pass 1: consistent 16px padding */}
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#0F1419] border border-gray-200 dark:border-gray-700 text-[#B3822A] dark:text-[#D4A853]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    {/* Pass 5: sentence case, not uppercase */}
                    <span className="text-gray-500 dark:text-gray-500 text-[10px] block">Email</span>
                    <span className="text-[#1A1F2E] dark:text-white font-medium">soorajkrishnanvs@gmail.com</span>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-[#2D3447] hover:bg-[#D4A853] dark:hover:bg-[#D4A853] text-gray-500 hover:text-[#1A1F2E] transition-colors border border-gray-200 dark:border-transparent"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href="https://linkedin.com/in/soorajkrishnanvs"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-800 flex items-center space-x-3 hover:border-[#B3822A]/40 dark:hover:border-[#D4A853]/40 transition-colors block"
              >
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#0F1419] border border-gray-200 dark:border-gray-700 text-[#B3822A] dark:text-[#D4A853]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-500 text-[10px] block">LinkedIn</span>
                  <span className="text-[#1A1F2E] dark:text-white font-medium">linkedin.com/in/soorajkrishnanvs</span>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-800 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#0F1419] border border-gray-200 dark:border-gray-700 text-[#B3822A] dark:text-[#D4A853]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-500 text-[10px] block">Phone (India)</span>
                  <span className="text-[#1A1F2E] dark:text-white font-medium">+91 6282363736</span>
                </div>
              </div>
            </div>

            {/* Availability — Pass 9: static dot, not pinging animation */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center space-x-3">
              {/* Static status dot — it's a real status, not live data; ping would be misleading */}
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              <p className="text-xs font-mono text-emerald-800 dark:text-emerald-300">
                <strong>Open</strong> to cloud data engineering roles and architecture consulting
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-md relative">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
              <h3 className="font-display font-semibold text-xl text-[#1A1F2E] dark:text-[#F5F0E8] flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-[#B3822A] dark:text-[#D4A853]" />
                Send a message
              </h3>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="p-8 bg-emerald-50 dark:bg-[#0F1419] border border-emerald-200 dark:border-emerald-800 rounded-xl text-center space-y-4"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                {/* Pass 4: no exclamation, plain copy */}
                <h4 className="font-display font-semibold text-xl text-[#1A1F2E] dark:text-white">Message sent</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-body max-w-md mx-auto">
                  Thanks, <strong className="text-[#B3822A] dark:text-[#D4A853]">{formData.name}</strong>. A reply will come to{' '}
                  <span className="text-emerald-700 dark:text-emerald-400">{formData.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-gray-100 dark:bg-[#2D3447] hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-mono text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    {/* Pass 5: sentence case labels, not uppercase */}
                    <label className="block text-xs font-mono text-gray-500 dark:text-gray-500 mb-1.5">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Sarah Jenkins"
                      className="w-full bg-gray-50 dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-[#1A1F2E] dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#B3822A] dark:focus:border-[#D4A853] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-500 dark:text-gray-500 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@company.com"
                      className="w-full bg-gray-50 dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-[#1A1F2E] dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#B3822A] dark:focus:border-[#D4A853] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 dark:text-gray-500 mb-1.5">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Tech Corp"
                      className="w-full bg-gray-50 dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-[#1A1F2E] dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#B3822A] dark:focus:border-[#D4A853] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-500 dark:text-gray-500 mb-1.5">
                      Pipeline requirement
                    </label>
                    <select
                      value={formData.pipelineType}
                      onChange={(e) => setFormData({ ...formData, pipelineType: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-[#1A1F2E] dark:text-white focus:outline-none focus:border-[#B3822A] dark:focus:border-[#D4A853] transition-colors font-mono"
                    >
                      <option value="Medallion Architecture (ADX/Lakehouse)">Medallion lakehouse (Azure Event Hubs / ADX)</option>
                      <option value="FastAPI REST Automation">FastAPI & Pydantic microservice automation</option>
                      <option value="AWS Step Functions & Textract OCR">AWS Textract document parsing</option>
                      <option value="Unsupervised ML & Topic Modeling">Unsupervised topic modeling & NLP</option>
                      <option value="General Engineering Opportunity">General data engineering / hiring</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 dark:text-gray-500 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your data pipeline goals, scaling challenges, or team requirements..."
                    className="w-full bg-gray-50 dark:bg-[#0F1419] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-[#1A1F2E] dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#B3822A] dark:focus:border-[#D4A853] transition-colors resize-none"
                  />
                </div>

                {/* Pass 9: no scale, transition-colors. Pass 4: plain copy */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#D4A853] hover:bg-[#C89940] text-[#1A1F2E] font-display font-medium text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
