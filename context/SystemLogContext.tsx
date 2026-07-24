'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, ChevronUp, ChevronDown, Trash2, Radio, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export type LogLevel =
  | 'STREAM_EVENT'
  | 'KQL_EXEC'
  | 'PIPELINE_INSPECT'
  | 'EASTER_EGG'
  | 'AUDIT_LOG'
  | 'DATA_ACTION'
  | 'INFO';

export interface SystemLogItem {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: string;
}

interface SystemLogContextType {
  logs: SystemLogItem[];
  addLog: (level: LogLevel, message: string, details?: string) => void;
  clearLogs: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

const SystemLogContext = createContext<SystemLogContextType | undefined>(undefined);

export function SystemLogProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<SystemLogItem[]>([]);
  const [toasts, setToasts] = useState<SystemLogItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addLog = useCallback((level: LogLevel, message: string, details?: string) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const newLog: SystemLogItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp,
      level,
      message,
      details,
    };

    setLogs((prev) => [newLog, ...prev].slice(0, 50)); // Keep last 50
    setToasts((prev) => [newLog, ...prev].slice(0, 3)); // Max 3 visible active toasts

    // Auto dismiss toast after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newLog.id));
    }, 4500);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
    setToasts([]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Initial stream initialization log
  useEffect(() => {
    const timer = setTimeout(() => {
      addLog('STREAM_EVENT', 'Azure Lakehouse Stream Listener Connected', 'ADX Cluster: adxsoorajkrishnan.kusto.windows.net');
    }, 1200);
    return () => clearTimeout(timer);
  }, [addLog]);

  const getLevelBadge = (level: LogLevel) => {
    switch (level) {
      case 'STREAM_EVENT':
        return { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', tag: '[STREAM_EVENT]' };
      case 'KQL_EXEC':
        return { color: 'bg-sky-500/20 text-sky-300 border-sky-500/40', tag: '[KQL_EXEC]' };
      case 'PIPELINE_INSPECT':
        return { color: 'bg-[#D4A853]/20 text-[#E8C878] border-[#D4A853]/40', tag: '[PIPELINE]' };
      case 'EASTER_EGG':
        return { color: 'bg-purple-500/20 text-purple-300 border-purple-500/40', tag: '[EASTER_EGG]' };
      case 'AUDIT_LOG':
        return { color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', tag: '[AUDIT_LOG]' };
      case 'DATA_ACTION':
        return { color: 'bg-teal-500/20 text-teal-300 border-teal-500/40', tag: '[DATA_ACTION]' };
      default:
        return { color: 'bg-gray-500/20 text-gray-300 border-gray-500/40', tag: '[INFO]' };
    }
  };

  return (
    <SystemLogContext.Provider value={{ logs, addLog, clearLogs, isDrawerOpen, setIsDrawerOpen }}>
      {children}

      {/* Floating System Log Toast Stack (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end space-y-2.5 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const badge = getLevelBadge(toast.level);
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.9 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="pointer-events-auto w-full bg-[#0F1419]/95 backdrop-blur-md border border-[#D4A853]/40 rounded-xl p-3.5 shadow-2xl text-xs font-mono text-[#F5F0E8] relative overflow-hidden group"
              >
                {/* Glowing Top Bar Accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-[#D4A853] to-sky-400 animate-pulse" />

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${badge.color}`}>
                      {badge.tag}
                    </span>
                    <span className="text-[10px] text-gray-400">{toast.timestamp}</span>
                  </div>

                  <button
                    onClick={() => removeToast(toast.id)}
                    className="p-1 hover:text-white text-gray-500 transition rounded hover:bg-gray-800/60"
                    title="Dismiss notification"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="mt-2 text-xs font-semibold text-gray-200 leading-snug">
                  {toast.message}
                </p>

                {toast.details && (
                  <p className="mt-1 text-[11px] text-[#D4A853] bg-[#1A1F2E] px-2 py-1 rounded border border-gray-800 font-mono truncate">
                    {toast.details}
                  </p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Global Live Log Drawer Trigger Bar */}
        <button
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          className="pointer-events-auto bg-[#0F1419]/90 backdrop-blur-md hover:bg-[#1A1F2E] border border-[#D4A853]/40 hover:border-[#D4A853] text-[#D4A853] font-mono text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center space-x-2.5 transition-all group"
        >
          <div className="p-1 rounded bg-[#1A1F2E] border border-[#D4A853]/30">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="font-bold">SYSTEM LOG FEED</span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#D4A853]/20 text-[#E8C878] text-[10px] font-bold">
            {logs.length}
          </span>
          {isDrawerOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Live System Log Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-16 right-5 z-40 w-full max-w-md bg-[#0F1419]/95 backdrop-blur-xl border border-[#D4A853]/40 rounded-2xl p-4 shadow-2xl text-xs font-mono text-[#F5F0E8] flex flex-col max-h-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="font-display font-bold text-sm text-[#F5F0E8]">
                  Real-time System Stream Feed
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={clearLogs}
                  className="p-1.5 text-gray-400 hover:text-red-400 transition rounded hover:bg-gray-800"
                  title="Clear All Logs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white transition rounded hover:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Log Scroll Area */}
            <div className="flex-1 overflow-y-auto my-3 space-y-2 pr-1 font-mono text-[11px] scrollbar-thin">
              {logs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No event logs captured yet. Interact with the portfolio to trigger stream logs.
                </div>
              ) : (
                logs.map((log) => {
                  const badge = getLevelBadge(log.level);
                  return (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-lg bg-[#1A1F2E]/80 border border-gray-800/80 space-y-1 hover:border-gray-700 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${badge.color}`}>
                          {badge.tag}
                        </span>
                        <span className="text-[10px] text-gray-500">{log.timestamp}</span>
                      </div>
                      <p className="text-gray-200 font-medium">{log.message}</p>
                      {log.details && (
                        <p className="text-[10px] text-[#D4A853] bg-[#0F1419] px-2 py-0.5 rounded border border-gray-800 truncate">
                          {log.details}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer status */}
            <div className="pt-2 border-t border-gray-800/80 text-[10px] text-gray-400 flex items-center justify-between">
              <span>Status: Listening to User Events</span>
              <span className="text-emerald-400 font-bold">● Active CDC Pipeline</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SystemLogContext.Provider>
  );
}

export function useSystemLog() {
  const context = useContext(SystemLogContext);
  if (!context) {
    throw new Error('useSystemLog must be used within a SystemLogProvider');
  }
  return context;
}
