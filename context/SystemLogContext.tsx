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
