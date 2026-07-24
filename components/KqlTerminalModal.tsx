'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Play, RefreshCw, Copy, Check, Sparkles, HelpCircle } from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';

interface KqlTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KqlTerminalModal({ isOpen, onClose }: KqlTerminalModalProps) {
  const [command, setCommand] = useState('');
  const { addLog } = useSystemLog();
  const [history, setHistory] = useState<Array<{ cmd: string; result: string | React.ReactNode; type: 'info' | 'success' | 'table' | 'error' }>>([
    {
      cmd: 'WELCOME',
      type: 'info',
      result: (
        <div className="space-y-1 text-xs sm:text-sm">
          <p className="text-[#D4A853] font-bold">⚡ Azure Data Explorer / KQL Interactive Shell v3.5</p>
          <p className="text-[#94A3B8]">Connected to Cluster: <span className="text-[#E8C878]">adx-sooraj-prod.kusto.windows.net</span></p>
          <p className="text-[#94A3B8]">Type <span className="text-emerald-400 font-mono font-bold">HELP</span> or click quick queries below to explore Sooraj&apos;s data lakehouse.</p>
        </div>
      ),
    },
  ]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger parent opening handled if needed or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRunCommand = (inputCmd?: string) => {
    const cmdToExecute = (inputCmd || command).trim();
    if (!cmdToExecute) return;

    const lower = cmdToExecute.toLowerCase();
    let resultNode: React.ReactNode = '';
    let resultType: 'info' | 'success' | 'table' | 'error' = 'info';

    if (lower.includes('select * from journey') || lower === 'journey' || lower === 'walk journey') {
      resultType = 'table';
      resultNode = (
        <div className="overflow-x-auto my-2 border border-[#D4A853]/30 rounded bg-[#0F1419] p-2 text-xs">
          <table className="w-full text-left font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#D4A853]/40 text-[#D4A853]">
                <th className="p-1">Year</th>
                <th className="p-1">Stage</th>
                <th className="p-1">Organization</th>
                <th className="p-1">Key Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-[#F5F0E8]">
              <tr>
                <td className="p-1 text-emerald-400">2016-19</td>
                <td className="p-1 font-semibold">BSc Comp Sci</td>
                <td className="p-1 text-gray-400">M.G. University</td>
                <td className="p-1">C++, Data Structures, Relational DBs</td>
              </tr>
              <tr>
                <td className="p-1 text-emerald-400">2019-21</td>
                <td className="p-1 font-semibold">MSc Comp Sci</td>
                <td className="p-1 text-gray-400">M.G. University</td>
                <td className="p-1">Distributed Systems, ML & Python Analytics</td>
              </tr>
              <tr>
                <td className="p-1 text-emerald-400">2021-Present</td>
                <td className="p-1 font-semibold">Cloud Data Engineer</td>
                <td className="p-1 text-amber-300">TCS (Kochi)</td>
                <td className="p-1 font-bold text-amber-400">Medallion Pipelines, FastAPI (60% time cut), AWS Document Parsing</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (lower.includes('medallion') || lower === 'show medallion status') {
      resultType = 'success';
      resultNode = (
        <div className="p-2 bg-[#0F1419] border border-emerald-500/30 rounded text-xs space-y-1 font-mono">
          <p className="text-emerald-400 font-bold">🟢 Azure Data Explorer Medallion Ingestion Flow Status:</p>
          <p className="text-amber-300">🥉 Bronze Layer (Raw): <span className="text-white">Azure Event Hubs + Debezium CDC (Streaming 2.4M msg/s)</span></p>
          <p className="text-gray-300">🥈 Silver Layer (Cleaned): <span className="text-white">Schema validation & deduplication via PySpark</span></p>
          <p className="text-emerald-300">🥇 Gold Layer (Aggregated): <span className="text-white">ADX Materialized Views + Grafana Dashboard (Health: 100%)</span></p>
        </div>
      );
    } else if (lower.includes('api_generator') || lower.includes('fastapi')) {
      resultType = 'info';
      resultNode = (
        <div className="p-2 bg-[#0F1419] border border-blue-500/30 rounded text-xs space-y-1 font-mono text-blue-200">
          <p className="text-blue-400 font-bold">🚀 Dynamic FastAPI + Pydantic Framework Metrics:</p>
          <p>• Automated creation of GET REST APIs from database schemas</p>
          <p>• Development Cycle Reduction: <span className="text-emerald-400 font-bold">5 Days ➔ 2 Days (60% Dev Acceleration)</span></p>
          <p>• Strict runtime request/response validation with Pydantic v2 models</p>
        </div>
      );
    } else if (lower.includes('skills') || lower === 'analyze skills') {
      resultType = 'table';
      resultNode = (
        <div className="grid grid-cols-2 gap-2 my-2 text-xs font-mono">
          <div className="p-2 bg-slate-900 border border-amber-500/20 rounded">
            <span className="text-amber-400 font-bold block mb-1">Languages & Engines:</span>
            <p className="text-gray-300">Python, SQL, KQL (Kusto Query Language), PySpark, Scala</p>
          </div>
          <div className="p-2 bg-slate-900 border border-blue-500/20 rounded">
            <span className="text-blue-400 font-bold block mb-1">Cloud Platforms:</span>
            <p className="text-gray-300">Azure (Event Hubs, ADX), AWS (Step Functions, Textract, A2I, Comprehend)</p>
          </div>
          <div className="p-2 bg-slate-900 border border-emerald-500/20 rounded">
            <span className="text-emerald-400 font-bold block mb-1">DevOps & Infra:</span>
            <p className="text-gray-300">Terraform, Bicep, CI/CD, Git, Docker, Kubernetes</p>
          </div>
          <div className="p-2 bg-slate-900 border border-purple-500/20 rounded">
            <span className="text-purple-400 font-bold block mb-1">AI & NLP:</span>
            <p className="text-gray-300">Topic Modeling, Gensim, SpaCy, Generative AI, NER</p>
          </div>
        </div>
      );
    } else if (lower.includes('certifications') || lower.includes('certs')) {
      resultType = 'info';
      resultNode = (
        <div className="space-y-1 text-xs font-mono p-2 bg-[#0F1419] border border-amber-500/30 rounded">
          <p className="text-amber-400 font-bold">📜 Professional Certifications Held by Sooraj:</p>
          <p className="text-emerald-300">1. Databricks Certified Data Engineer Associate (2026)</p>
          <p className="text-amber-300">2. AWS Certified AI Practitioner (2026)</p>
          <p className="text-blue-300">3. Microsoft Certified: Azure AI Fundamentals (2024)</p>
        </div>
      );
    } else if (lower === 'help') {
      resultType = 'info';
      resultNode = (
        <div className="text-xs font-mono space-y-1 text-gray-300 p-2 bg-[#0F1419] rounded">
          <p className="text-amber-400 font-bold mb-1">Available KQL / SQL Commands:</p>
          <p>• <span className="text-emerald-400">SELECT * FROM journey</span> : Walk Sooraj&apos;s career progression</p>
          <p>• <span className="text-emerald-400">SHOW MEDALLION STATUS</span> : Inspect live data streaming pipeline</p>
          <p>• <span className="text-emerald-400">EXPLAIN API_GENERATOR</span> : Learn how 60% dev time was cut</p>
          <p>• <span className="text-emerald-400">ANALYZE SKILLS</span> : Detailed skill inventory query</p>
          <p>• <span className="text-emerald-400">GET CERTIFICATIONS</span> : Show Databricks, AWS & Azure certs</p>
          <p>• <span className="text-emerald-400">CLEAR</span> : Reset terminal output window</p>
        </div>
      );
    } else if (lower === 'clear') {
      setHistory([]);
      setCommand('');
      return;
    } else {
      resultType = 'error';
      resultNode = (
        <div className="text-xs font-mono text-red-400">
          Command not recognized: &quot;{cmdToExecute}&quot;. Type <span className="text-amber-300 font-bold">HELP</span> or <span className="text-emerald-400">SELECT * FROM journey</span>.
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      { cmd: cmdToExecute, result: resultNode, type: resultType },
    ]);

    if (resultType === 'error') {
      addLog('KQL_EXEC', `KQL Command Failed: ${cmdToExecute}`, 'Syntax error / Command not in registry');
    } else {
      addLog('EASTER_EGG', `KQL Shell Easter Egg Executed: ${cmdToExecute}`, `Query Result Type: [${resultType.toUpperCase()}]`);
    }

    setCommand('');
  };

  const copyTerminalHistory = () => {
    const textToCopy = history.map(h => `$ ${h.cmd}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0F1419] border border-[#D4A853]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1A1F2E] border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            </div>
            <div className="flex items-center space-x-2 ml-2 text-xs sm:text-sm font-mono text-[#D4A853]">
              <Terminal className="w-4 h-4 text-[#D4A853]" />
              <span className="font-bold">kql_terminal@sooraj-lakehouse:~</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={copyTerminalHistory}
              title="Copy session commands"
              className="p-1.5 text-gray-400 hover:text-[#D4A853] transition-colors rounded hover:bg-gray-800"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setHistory([])}
              title="Clear terminal"
              className="p-1.5 text-gray-400 hover:text-white transition-colors rounded hover:bg-gray-800"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Commands Ribbon */}
        <div className="px-4 py-2 bg-[#141A24] border-b border-gray-800 flex items-center space-x-2 overflow-x-auto text-xs font-mono scrollbar-none">
          <span className="text-gray-500 flex items-center shrink-0">
            <Sparkles className="w-3 h-3 mr-1 text-[#D4A853]" /> Quick Query:
          </span>
          {[
            'SELECT * FROM journey',
            'SHOW MEDALLION STATUS',
            'EXPLAIN API_GENERATOR',
            'ANALYZE SKILLS',
            'GET CERTIFICATIONS',
            'HELP',
          ].map((quickCmd) => (
            <button
              key={quickCmd}
              onClick={() => handleRunCommand(quickCmd)}
              className="px-2 py-1 bg-[#1A1F2E] hover:bg-[#D4A853]/20 border border-gray-700 hover:border-[#D4A853] text-[#E8C878] rounded transition-all shrink-0 text-[11px]"
            >
              {quickCmd}
            </button>
          ))}
        </div>

        {/* Output Area */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 font-mono text-xs sm:text-sm text-gray-200">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              {item.cmd !== 'WELCOME' && (
                <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                  <span>sooraj-adx$&gt;</span>
                  <span className="text-white">{item.cmd}</span>
                </div>
              )}
              <div>{item.result}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunCommand();
          }}
          className="p-3 bg-[#1A1F2E] border-t border-gray-800 flex items-center space-x-2"
        >
          <span className="text-emerald-400 font-mono font-bold text-sm">$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type KQL query (e.g. SELECT * FROM journey) or HELP..."
            className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm font-mono text-[#F5F0E8] placeholder-gray-500 focus:ring-0"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-[#D4A853] hover:bg-[#E8C878] text-[#1A1F2E] font-bold font-mono text-xs rounded transition-all flex items-center space-x-1"
          >
            <span>Run</span>
            <Play className="w-3 h-3 fill-current" />
          </button>
        </form>

        {/* Footer Hint */}
        <div className="px-4 py-1.5 bg-[#0F1419] border-t border-gray-800 flex items-center justify-between text-[10px] text-gray-500 font-mono">
          <span>Press <kbd className="px-1 py-0.5 bg-gray-800 rounded text-gray-300">Esc</kbd> to exit</span>
          <span>KQL/SQL Data Easter Egg | Sooraj Krishnan V S</span>
        </div>
      </div>
    </div>
  );
}
