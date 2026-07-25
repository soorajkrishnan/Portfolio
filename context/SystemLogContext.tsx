'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

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
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  // Initial stream initialization log
  useEffect(() => {
    const timer = setTimeout(() => {
      addLog('STREAM_EVENT', 'Azure Lakehouse Stream Listener Connected', 'ADX Cluster: adxsoorajkrishnan.kusto.windows.net');
    }, 1200);
    return () => clearTimeout(timer);
  }, [addLog]);

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
